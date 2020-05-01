import asyncio
import functools
import logging
import re
import serial
import socket
from functools import wraps
from serial_asyncio import create_serial_connection
from threading import RLock

_LOGGER = logging.getLogger(__name__)
ZONE_PATTERN_ON = re.compile('\D\D\D\s(\d\d)\D\D\d\d\s\s\D\D\D\s(\d\d)\D\D\d\d\s')
ZONE_PATTERN_OFF = re.compile('\D\D\DOFF\D\D\d\d\s\s\D\D\D\D\D\D\D\D\d\d\s')
ZONE_PATTERN_ON_NO_IR = re.compile('\D\D\D\s(\d\d)\D\D\d\d\s\s')
ZONE_PATTERN_OFF_NO_IR = re.compile('\D\D\DOFF\D\D\d\d\\s\s')
EOL = b'\r'
LEN_EOL = len(EOL)
TIMEOUT = 2 # Number of seconds before serial operation timeout
PORT = 4001
SOCKET_RECV = 2048

class ZoneStatus(object):
    def __init__(self,
                 zone: int,
                 power: bool,
                 av: int,
                 ir: int):
        self.zone = zone
        self.power = power
        self.av = av
        self.ir = ir

    @classmethod
    def from_string(cls, zone: int, string: str):
        if not string:
            return None
        match_on = re.search (ZONE_PATTERN_ON, string)
        if not match_on:
            match_on = re.search (ZONE_PATTERN_ON_NO_IR, string)
            if not match_on:
                match_off = re.search (ZONE_PATTERN_OFF, string)
                if not match_off:
                    match_off = re.search (ZONE_PATTERN_OFF_NO_IR, string)
                    if not match_off:
                        return None
                    return ZoneStatus(zone,0,None,None)
                return ZoneStatus(zone,0,None,None)
            return ZoneStatus(zone,1,*[int(m) for m in match_on.groups()], None)
        return ZoneStatus(zone,1,*[int(m) for m in match_on.groups()])

class LockStatus(object):
    def __init__(self,
                 lock: bool):
        self.lock = lock

    @classmethod
    def from_string(cls, string: str):
        if not string:
            return None
        #string = string[7:].rstrip()
        if string.startswith('System Locked'):
            return True
        else:
            return False


class Blackbird2(object):
    """
    Monoprice blackbird amplifier interface
    """

    def zone_status(self, zone: int):
        """
        Get the structure representing the status of the zone
        :param zone: zone 1..8
        :return: status of the zone or None
        """
        raise NotImplemented()

    def set_zone_power(self, zone: int, power: bool):
        """
        Turn zone on or off
        :param zone: Zone 1-8
        :param power: True to turn on, False to turn off
        """
        raise NotImplemented()

    def set_zone_source(self, zone: int, source: int):
        """
        Set source for zone
        :param zone: Zone 1-8
        :param source: integer from 1-8
        """
        raise NotImplemented()

    def set_all_zone_source(self, source: int):
        """
        Set source for all zones
        :param source: integer from 1-8
        """
        raise NotImplemented()

    def lock_front_buttons():
        """
        Lock front panel buttons
        """
        raise NotImplemented()

    def unlock_front_buttons():
        """
        Unlock front panel buttons
        """
        raise NotImplemented()

    def lock_status():
        """
        Report system locking status
        """
        raise NotImplemented()


# Helpers

def _format_zone_status_request(zone: int) -> bytes:
    return 'Status{}.\r'.format(zone).encode()

def _format_set_zone_power(zone: int, power: bool) -> bytes:
    return '{}{}.\r'.format(zone, '@' if power else '$').encode()

def _format_set_zone_source(zone: int, source: int) -> bytes:
    source = int(max(1, min(source,8)))
    return '{}B{}.\r'.format(source, zone).encode()

def _format_set_zone_source_no_ir(zone: int, source: int) -> bytes:
    source = int(max(1, min(source,8)))
    return '{}V{}.\r'.format(source, zone).encode()

def _format_set_all_zone_source(source: int) -> bytes:
    source = int(max(1, min(source,8)))
    return '{}All.\r'.format(source).encode()

def _format_lock_front_buttons() -> bytes:
    return '/%Lock;\r'.encode()

def _format_unlock_front_buttons() -> bytes:
    return '/%Unlock;\r'.encode()

def _format_lock_status() -> bytes:
    return '%9961.\r'.encode()


def get_blackbird2(url, use_serial=True, ir_control=True):
    """
    Return synchronous version of Blackbird interface
    :param port_url: serial port, i.e. '/dev/ttyUSB0'
    :return: synchronous implementation of Blackbird interface
    """
    lock = RLock()
    print(serial)

    def synchronized(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            with lock:
                return func(*args, **kwargs)
        return wrapper

    class blackbird2Sync(Blackbird2):
        def __init__(self, url):
            """
            Initialize the client.
            """
            if use_serial:
                self._port = serial.serial_for_url(url, do_not_open=True)
                self._port.baudrate = 9600
                self._port.stopbits = serial.STOPBITS_ONE
                self._port.bytesize = serial.EIGHTBITS
                self._port.parity = serial.PARITY_NONE
                self._port.timeout = TIMEOUT
                self._port.write_timeout = TIMEOUT
                self._port.open()

            else:
                self.host = url
                self.port = PORT
                self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self.socket.settimeout(TIMEOUT)
                self.socket.connect((self.host, self.port))

                # Clear login message
                self.socket.recv(SOCKET_RECV)

        def _process_request(self, request: bytes, skip=0):
            """
            Send data to socket
            :param request: request that is sent to the blackbird
            :param skip: number of bytes to skip for end of transmission decoding
            :return: ascii string returned by blackbird
            """
            _LOGGER.debug('Sending "%s"', request)

            if use_serial:
                # clear
                self._port.reset_output_buffer()
                self._port.reset_input_buffer()
                # send
                self._port.write(request)
                self._port.flush()
                # receive
                result = bytearray()
                while True:
                    c = self._port.read(1)
                    if c is None:
                        break
                    if not c:
                        raise serial.SerialTimeoutException(
                            'Connection timed out! Last received bytes {}'.format([hex(a) for a in result]))
                    result += c
                    if len(result) > skip and result [-LEN_EOL:] == EOL:
                        break
                ret = bytes(result)
                _LOGGER.debug('Received "%s"', ret)
                return ret.decode('ascii')

            else:
                self.socket.send(request)

                response = ''

                while True:

                    data = self.socket.recv(SOCKET_RECV)
                    response += data.decode('ascii')
                    
                    if EOL in data and len(response) > skip:
                        break

                return response

        @synchronized
        def zone_status(self, zone: int):
            # Returns status of a zone
            if ir_control:
                return ZoneStatus.from_string(zone, self._process_request(_format_zone_status_request(zone), skip=20))
            return ZoneStatus.from_string(zone, self._process_request(_format_zone_status_request(zone), skip=10))

        @synchronized
        def set_zone_power(self, zone: int, power: bool):
            # Set zone power
            self._process_request(_format_set_zone_power(zone, power))

        @synchronized
        def set_zone_source(self, zone: int, source: int):
            # Set zone source
            self._process_request(_format_set_zone_source(zone, source))

        @synchronized
        def set_zone_source_no_ir(self, zone: int, source: int):
            # Set zone source without IR
            self._process_request(_format_set_zone_source_no_ir(zone, source))

        @synchronized
        def set_all_zone_source(self, source: int):
            # Set all zones to one source
            self._process_request(_format_set_all_zone_source(source))

        @synchronized
        def lock_front_buttons(self):
            # Lock front panel buttons
            self._process_request(_format_lock_front_buttons())

        @synchronized
        def unlock_front_buttons(self):
            # Unlock front panel buttons
            self._process_request(_format_unlock_front_buttons())

        @synchronized
        def lock_status(self):
            # Report system locking status
            return LockStatus.from_string(self._process_request(_format_lock_status()))

    return blackbird2Sync(url)


@asyncio.coroutine
def get_async_blackbird2(port_url, loop):
    """
    Return asynchronous version of Blackbird interface
    :param port_url: serial port, i.e. '/dev/ttyUSB0'
    :return: asynchronous implementation of Blackbird interface
    """

    lock = asyncio.Lock()

    def locked_coro(coro):
        @asyncio.coroutine
        @wraps(coro)
        def wrapper(*args, **kwargs):
            with (yield from lock):
                return (yield from coro(*args, **kwargs))
        return wrapper

    class blackbird2Async(blackbird2):
        def __init__(self, blackbird2_protocol):
            self._protocol = blackbird2_protocol

        @locked_coro
        @asyncio.coroutine
        def zone_status(self, zone: int):
            string = yield from self._protocol.send(_format_zone_status_request(zone), skip=15)
            return ZoneStatus.from_string(zone, string)

        @locked_coro
        @asyncio.coroutine
        def set_zone_power(self, zone: int, power: bool):
            yield from self._protocol.send(_format_set_zone_power(zone, power))

        @locked_coro
        @asyncio.coroutine
        def set_zone_source(self, zone: int, source: int):
            yield from self._protocol.send(_format_set_zone_source(zone, source))

        @locked_coro
        @asyncio.coroutine
        def set_zone_source_no_ir(self, zone: int, source: int):
            yield from self._protocol.send(_format_set_zone_source_no_ir(zone, source))

        @locked_coro
        @asyncio.coroutine
        def set_all_zone_source(self, source: int):
            yield from self._protocol.send(_format_set_all_zone_source(source))

        @locked_coro
        @asyncio.coroutine
        def lock_front_buttons(self):
            yield from self._protocol.send(_format_lock_front_buttons())

        @locked_coro
        @asyncio.coroutine
        def unlock_front_buttons(self):
            yield from self._protocol.send(_format_unlock_front_buttons())

        @locked_coro
        @asyncio.coroutine
        def lock_status(self):
            string = yield from self._protocol.send(_format_lock_status())
            return LockStatus.from_string(string)

    class blackbird2Protocol(asyncio.Protocol):
        def __init__(self, loop):
            super().__init__()
            self._loop = loop
            self._lock = asyncio.Lock()
            self._transport = None
            self._connected = asyncio.Event(loop=loop)
            self.q = asyncio.Queue(loop=loop)

        def connection_made(self, transport):
            self._transport = transport
            self._connected.set()
            _LOGGER.debug('port opened %s', self._transport)

        def data_received(self, data):
            asyncio.ensure_future(self.q.put(data), loop=self._loop)

        @asyncio.coroutine
        def send(self, request: bytes, skip=0):
            yield from self._connected.wait()
            result = bytearray()
            # Only one transaction at a time
            with (yield from self._lock):
                self._transport.serial.reset_output_buffer()
                self._transport.serial.reset_input_buffer()
                while not self.q.empty():
                    self.q.get_nowait()
                self._transport.write(request)
                try:
                    while True:
                        result += yield from asyncio.wait_for(self.q.get(), TIMEOUT, loop=self._loop)
                        if len(result) > skip and result[-LEN_EOL:] == EOL:
                            ret = bytes(result)
                            _LOGGER.debug('Received "%s"', ret)
                            return ret.decode('ascii')
                except asyncio.TimeoutError:
                    _LOGGER.error("Timeout during receiving response for command '%s', received='%s'", request, result)
                    raise

    _, protocol = yield from create_serial_connection(loop, functools.partial(blackbird2Protocol, loop), port_url, baudrate=9600)

    return blackbird2Async(protocol)





#*****************************************************************************************************************************************************************************************************************

from serial import SerialException
import voluptuous as vol

from homeassistant.components.media_player import PLATFORM_SCHEMA, MediaPlayerDevice
from homeassistant.components.media_player.const import (
    SUPPORT_SELECT_SOURCE,
    SUPPORT_TURN_OFF,
    SUPPORT_TURN_ON,
)
from homeassistant.const import (
    ATTR_ENTITY_ID,
    CONF_HOST,
    CONF_NAME,
    CONF_PORT,
    CONF_TYPE,
    STATE_OFF,
    STATE_ON,
)
import homeassistant.helpers.config_validation as cv

from .const import DOMAIN, SERVICE_SETALLZONES

_LOGGER = logging.getLogger(__name__)

SUPPORT_blackbird2 = SUPPORT_TURN_ON | SUPPORT_TURN_OFF | SUPPORT_SELECT_SOURCE

MEDIA_PLAYER_SCHEMA = vol.Schema({ATTR_ENTITY_ID: cv.comp_entity_ids})

ZONE_SCHEMA = vol.Schema({vol.Required(CONF_NAME): cv.string})

SOURCE_SCHEMA = vol.Schema({vol.Required(CONF_NAME): cv.string})

CONF_ZONES = "zones"
CONF_SOURCES = "sources"
CONF_IR = "ir_control"

DATA_blackbird2 = "blackbird2"

ATTR_SOURCE = "source"

blackbird2_SETALLZONES_SCHEMA = MEDIA_PLAYER_SCHEMA.extend(
    {vol.Required(ATTR_SOURCE): cv.string}
)


# Valid zone ids: 1-8
ZONE_IDS = vol.All(vol.Coerce(int), vol.Range(min=1, max=8))

# Valid source ids: 1-8
SOURCE_IDS = vol.All(vol.Coerce(int), vol.Range(min=1, max=8))

PLATFORM_SCHEMA = vol.All(
    cv.has_at_least_one_key(CONF_PORT, CONF_HOST),
    PLATFORM_SCHEMA.extend(
        {
            vol.Exclusive(CONF_PORT, CONF_TYPE): cv.string,
            vol.Exclusive(CONF_HOST, CONF_TYPE): cv.string,
            vol.Required(CONF_ZONES): vol.Schema({ZONE_IDS: ZONE_SCHEMA}),
            vol.Required(CONF_SOURCES): vol.Schema({SOURCE_IDS: SOURCE_SCHEMA}),
            vol.Optional(CONF_IR, default=True): cv.boolean,
        }
    ),
)


def setup_platform(hass, config, add_entities, discovery_info=None):
    """Set up the Monoprice Blackbird Matrix platform."""
    if DATA_blackbird2 not in hass.data:
        hass.data[DATA_blackbird2] = {}

    port = config.get(CONF_PORT)
    host = config.get(CONF_HOST)
    ir_control = config.get(CONF_IR)

    connection = None
    if port is not None:
        try:
            blackbird2 = get_blackbird2(port)
            connection = port
        except SerialException:
            _LOGGER.error("Error connecting to the blackbird2 controller")
            return

    if host is not None:
        try:
            blackbird2 = get_blackbird2(host, False, ir_control)
            connection = host
        except socket.timeout:
            _LOGGER.error("Error connecting to the blackbird2 controller")
            return

    sources = {
        source_id: extra[CONF_NAME] for source_id, extra in config[CONF_SOURCES].items()
    }

    devices = []
    for zone_id, extra in config[CONF_ZONES].items():
        _LOGGER.info("Adding zone %d - %s", zone_id, extra[CONF_NAME])
        unique_id = f"{connection}-{zone_id}"
        device = blackbird2Zone(blackbird2, sources, zone_id, ir_control, extra[CONF_NAME])
        hass.data[DATA_blackbird2][unique_id] = device
        devices.append(device)

    add_entities(devices, True)

    def service_handle(service):
        """Handle for services."""
        entity_ids = service.data.get(ATTR_ENTITY_ID)
        source = service.data.get(ATTR_SOURCE)
        if entity_ids:
            devices = [
                device
                for device in hass.data[DATA_blackbird2].values()
                if device.entity_id in entity_ids
            ]

        else:
            devices = hass.data[DATA_blackbird2].values()

        for device in devices:
            if service.service == SERVICE_SETALLZONES:
                device.set_all_zones(source)

    hass.services.register(
        DOMAIN, SERVICE_SETALLZONES, service_handle, schema=blackbird2_SETALLZONES_SCHEMA
    )


class blackbird2Zone(MediaPlayerDevice):
    """Representation of a blackbird2 matrix zone."""

    def __init__(self, blackbird2, sources, zone_id, ir_control, zone_name):
        """Initialize new zone."""
        self._blackbird2 = blackbird2
        # dict source_id -> source name
        self._source_id_name = sources
        # dict source name -> source_id
        self._source_name_id = {v: k for k, v in sources.items()}
        # ordered list of all source names
        self._source_names = sorted(
            self._source_name_id.keys(), key=lambda v: self._source_name_id[v]
        )
        self._zone_id = zone_id
        self._name = zone_name
        self._state = None
        self._source = None
        self._ir_control = ir_control

    def update(self):
        """Retrieve latest state."""
        state = self._blackbird2.zone_status(self._zone_id)
        if not state:
            return
        self._state = STATE_ON if state.power else STATE_OFF
        idx = state.av
        if idx in self._source_id_name:
            self._source = self._source_id_name[idx]
        else:
            self._source = None

    @property
    def name(self):
        """Return the name of the zone."""
        return self._name

    @property
    def state(self):
        """Return the state of the zone."""
        return self._state

    @property
    def ir_control(self):
        """Return the if this zone supports ir_control."""
        return self._ir_control

    @property
    def supported_features(self):
        """Return flag of media commands that are supported."""
        return SUPPORT_blackbird2

    @property
    def media_title(self):
        """Return the current source as media title."""
        return self._source

    @property
    def source(self):
        """Return the current input source of the device."""
        return self._source

    @property
    def source_list(self):
        """List of available input sources."""
        return self._source_names

    def set_all_zones(self, source):
        """Set all zones to one source."""
        if source not in self._source_name_id:
            return
        idx = self._source_name_id[source]
        _LOGGER.debug("Setting all zones source to %s", idx)
        self._blackbird2.set_all_zone_source(idx)

    def select_source(self, source):
        """Set input source."""
        if source not in self._source_name_id:
            return
        idx = self._source_name_id[source]
        _LOGGER.debug("Setting zone %d source to %s", self._zone_id, idx)
        if self._ir_control:
            self._blackbird2.set_zone_source(self._zone_id, idx)
        else:
            self._blackbird2.set_zone_source_no_ir(self._zone_id, idx)

    def turn_on(self):
        """Turn the media player on."""
        _LOGGER.debug("Turning zone %d on", self._zone_id)
        self._blackbird2.set_zone_power(self._zone_id, True)

    def turn_off(self):
        """Turn the media player off."""
        _LOGGER.debug("Turning zone %d off", self._zone_id)
        self._blackbird2.set_zone_power(self._zone_id, False)