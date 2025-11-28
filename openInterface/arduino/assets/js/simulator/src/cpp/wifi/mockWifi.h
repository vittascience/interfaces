// ===============================
// Mock Arduino WiFi stack for JSCPP
// ===============================

// ---------- Types Arduino de base manquants ----------

// Simule le type IPAddress Arduino
class IPAddress {
public:
    unsigned char _address[4];

    IPAddress() {
        _address[0] = 0;
        _address[1] = 0;
        _address[2] = 0;
        _address[3] = 0;
    }

    IPAddress(unsigned char a, unsigned char b, unsigned char c, unsigned char d) {
        _address[0] = a;
        _address[1] = b;
        _address[2] = c;
        _address[3] = d;
    }

    unsigned char operator[](int index) const {
        return _address[index];
    }

    unsigned char& operator[](int index) {
        return _address[index];
    }

    // toString() style helper si tu veux déboguer dans JSCPP
    // (dans l'Arduino réel c'est via Print << IPAddress)
    const char* toString() {
        static char buf[16];
        // format "a.b.c.d"
        int len = 0;
        len += snprintf(buf+len, sizeof(buf)-len, "%u.", _address[0]);
        len += snprintf(buf+len, sizeof(buf)-len, "%u.", _address[1]);
        len += snprintf(buf+len, sizeof(buf)-len, "%u.", _address[2]);
        snprintf(buf+len, sizeof(buf)-len, "%u", _address[3]);
        return buf;
    }
};

// Petit équivalent minimal de String Arduino pour JSCPP.
// Si tu utilises déjà un mock String, vire celui-ci.
class String {
public:
    const char* _cstr;
    String() : _cstr("") {}
    String(const char* s) : _cstr(s) {}
    const char* c_str() const { return _cstr; }
    operator const char*() const { return _cstr; }
};

// On simule Print juste assez pour compiler
class Print {
public:
    virtual size_t write(uint8_t b) { (void)b; return 1; }
    virtual size_t write(const uint8_t *buffer, size_t size) {
        (void)buffer;
        return size;
    }
    size_t print(const char* s) {
        // côté JSCPP tu peux loguer dans la console ici si tu veux
        (void)s;
        return 0;
    }
    size_t println(const char* s) {
        (void)s;
        return 0;
    }
    size_t println() {
        return 0;
    }
};

// Simule Client / Server / UDP bases Arduino
class Client : public Print {
public:
    virtual int connect(IPAddress ip, uint16_t port) = 0;
    virtual int connect(const char *host, uint16_t port) = 0;
    virtual int available() = 0;
    virtual int read() = 0;
    virtual int read(uint8_t *buf, size_t size) = 0;
    virtual int peek() = 0;
    virtual void flush() = 0;
    virtual void stop() = 0;
    virtual uint8_t connected() = 0;
    virtual operator bool() = 0;
};

class Server : public Print {
public:
    virtual void begin() = 0;
};

class UDP {
public:
    virtual uint8_t begin(uint16_t p) = 0;
    virtual void stop() = 0;
    virtual int beginPacket(IPAddress ip, uint16_t port) = 0;
    virtual int beginPacket(const char *host, uint16_t port) = 0;
    virtual int endPacket() = 0;
    virtual size_t write(uint8_t) = 0;
    virtual size_t write(const uint8_t *buffer, size_t size) = 0;
    virtual int parsePacket() = 0;
    virtual int available() = 0;
    virtual int read() = 0;
    virtual int read(unsigned char* buffer, size_t len) = 0;
    virtual int peek() = 0;
    virtual void flush() = 0;
    virtual IPAddress remoteIP() = 0;
    virtual uint16_t remotePort() = 0;
};

// ===============================
// WiFiTypes.h mock
// ===============================

// Valeurs fidèles aux enums Arduino WiFi (UNO R4 WiFi / WiFiS3)
typedef unsigned char wl_status_t;

const wl_status_t WL_NO_SHIELD        = 255;
const wl_status_t WL_IDLE_STATUS      = 0;
const wl_status_t WL_NO_SSID_AVAIL    = 1;
const wl_status_t WL_SCAN_COMPLETED   = 2;
const wl_status_t WL_CONNECTED        = 3;
const wl_status_t WL_CONNECT_FAILED   = 4;
const wl_status_t WL_CONNECTION_LOST  = 5;
const wl_status_t WL_DISCONNECTED     = 6;
const wl_status_t WL_AP_LISTENING     = 7;
const wl_status_t WL_AP_CONNECTED     = 8;
const wl_status_t WL_AP_FAILED        = 9;

// Type de chiffrement (valeurs pas critiques pour compiler le sketch)
typedef unsigned char wl_enc_type;
const wl_enc_type ENC_TYPE_WEP              = 0;
const wl_enc_type ENC_TYPE_TKIP             = 2;  // WPA
const wl_enc_type ENC_TYPE_CCMP             = 4;  // WPA2
const wl_enc_type ENC_TYPE_NONE             = 8;
const wl_enc_type ENC_TYPE_AUTO             = 255;
const wl_enc_type ENC_TYPE_UNKNOWN          = 255;

// Résultat ping (codes d'erreur négatifs typiques)
typedef int wl_ping_result_t;
const wl_ping_result_t WL_PING_DEST_UNREACHABLE = -1;
const wl_ping_result_t WL_PING_TIMEOUT          = -2;
const wl_ping_result_t WL_PING_UNKNOWN_HOST     = -3;
const wl_ping_result_t WL_PING_ERROR            = -4;

// Limites tailles
#define WL_SSID_MAX_LENGTH        32
#define WL_WPA_KEY_MAX_LENGTH     63
#define WL_WEP_KEY_MAX_LENGTH     13
#define WL_MAC_ADDR_LENGTH        6
#define WL_IPV4_LENGTH            4

// Adresses IP par défaut AP (pas critique, mais utile pour cohérence)
const IPAddress DEFAULT_IP_AP_ADDRESS(192,168,4,1);
const IPAddress DEFAULT_GW_AP_ADDRESS(192,168,4,1);
const IPAddress DEFAULT_NM_AP_ADDRESS(255,255,255,0);

// ===============================
// Mock WiFi scan result container
// (équivalent très light de CAccessPoint)
// ===============================

class MockAccessPoint {
public:
    char ssid[WL_SSID_MAX_LENGTH + 1];
    unsigned char bssid[6];
    int rssi;
    unsigned char channel;
    unsigned char encryption_mode;

    MockAccessPoint() {
        ssid[0] = '\0';
        for (int i=0;i<6;i++) bssid[i]=0;
        rssi = -42;
        channel = 6;
        encryption_mode = ENC_TYPE_CCMP;
    }
};

// ===============================
// WiFiClient mock (TCP client)
// ===============================

class WiFiClient : public Client {
public:
    bool _connected;
    IPAddress _remoteIp;
    uint16_t _remotePort;

    WiFiClient() {
        _connected = false;
        _remoteIp = IPAddress(93,184,216,34); // ex: example.org
        _remotePort = 80;
    }

    // connexion vers IP
    virtual int connect(IPAddress ip, uint16_t port) {
        _connected = true;
        _remoteIp = ip;
        _remotePort = port;
        return 1; // succès
    }

    // connexion vers host
    virtual int connect(const char *host, uint16_t port) {
        (void)host;
        _connected = true;
        _remotePort = port;
        return 1;
    }

    virtual int available() {
        // rien à lire dans ce mock
        return 0;
    }

    virtual int read() {
        // pas de données réelles
        return -1;
    }

    virtual int read(uint8_t *buf, size_t size) {
        (void)buf;
        (void)size;
        return 0;
    }

    virtual int peek() {
        return -1;
    }

    virtual void flush() {
        // rien
    }

    virtual void stop() {
        _connected = false;
    }

    virtual uint8_t connected() {
        return _connected ? 1 : 0;
    }

    virtual operator bool() {
        return _connected;
    }

    virtual size_t write(uint8_t b) {
        (void)b;
        return 1;
    }

    virtual size_t write(const uint8_t *buffer, size_t size) {
        (void)buffer;
        return size;
    }

    IPAddress remoteIP() {
        return _remoteIp;
    }

    uint16_t remotePort() {
        return _remotePort;
    }

    void setConnectionTimeout(int timeoutMs) {
        (void)timeoutMs;
    }
};

// ===============================
// WiFiSSLClient mock (TCP+TLS)
// ===============================

class WiFiSSLClient : public WiFiClient {
public:
    WiFiSSLClient() : WiFiClient() {}

    int connect(IPAddress ip, uint16_t port) {
        // même comportement que WiFiClient dans ce mock
        return WiFiClient::connect(ip, port);
    }

    int connect(const char *host, uint16_t port) {
        return WiFiClient::connect(host, port);
    }

    void setCACert(const char* root_ca) {
        (void)root_ca;
        // ignoré dans le mock
    }

    void setEccSlot(int eccSlot, const unsigned char* cert, int certLength) {
        (void)eccSlot;
        (void)cert;
        (void)certLength;
    }
};

// ===============================
// WiFiServer mock (serveur TCP)
// ===============================

class WiFiServer : public Server {
public:
    uint16_t _port;
    bool _listening;
    WiFiClient _fakeClient; // client fictif qu'on peut renvoyer

    WiFiServer() {
        _port = 80;
        _listening = false;
    }

    WiFiServer(int port) {
        _port = port;
        _listening = false;
    }

    virtual void begin() {
        _listening = true;
    }

    void begin(int port) {
        _port = port;
        _listening = true;
    }

    // Arduino style: server.available() retourne un client connecté si qqn s'est co
    WiFiClient available() {
        // Dans ce mock on renvoie un client "déconnecté" pour compiler sans planter
        return WiFiClient();
    }

    // Version plus "BSD accept()"
    WiFiClient accept() {
        return WiFiClient();
    }

    virtual size_t write(uint8_t b) {
        (void)b;
        return 1;
    }

    virtual size_t write(const uint8_t *buffer, size_t size) {
        (void)buffer;
        return size;
    }

    void end() {
        _listening = false;
    }

    operator bool() {
        return _listening;
    }
};

// ===============================
// WiFiUDP mock
// ===============================

class WiFiUDP : public UDP {
public:
    bool _open;
    uint16_t _localPort;
    IPAddress _remoteIp;
    uint16_t _remotePort;
    bool _hasPacket;

    WiFiUDP() {
        _open = false;
        _localPort = 0;
        _remoteIp = IPAddress(0,0,0,0);
        _remotePort = 0;
        _hasPacket = false;
    }

    virtual uint8_t begin(uint16_t p) {
        _open = true;
        _localPort = p;
        return 1;
    }

    // pas de multicast réel dans ce mock, mais on propose la signature commune
    uint8_t begin(IPAddress addr, uint16_t port) {
        (void)addr;
        _open = true;
        _localPort = port;
        return 1;
    }

    uint8_t beginMulticast(IPAddress multicastAddr, uint16_t port) {
        (void)multicastAddr;
        _open = true;
        _localPort = port;
        return 1;
    }

    virtual void stop() {
        _open = false;
    }

    virtual int beginPacket(IPAddress ip, uint16_t port) {
        _remoteIp = ip;
        _remotePort = port;
        return 1;
    }

    virtual int beginPacket(const char *host, uint16_t port) {
        (void)host;
        _remotePort = port;
        return 1;
    }

    int beginMulticastPacket() {
        return 1;
    }

    virtual int endPacket() {
        // en vrai on enverrait le buffer accumulé
        return 1;
    }

    virtual size_t write(uint8_t b) {
        (void)b;
        return 1;
    }

    virtual size_t write(const uint8_t *buffer, size_t size) {
        (void)buffer;
        return size;
    }

    virtual int parsePacket() {
        // Simule qu'il n'y a pas de nouveau paquet entrant
        _hasPacket = false;
        return 0;
    }

    virtual int available() {
        return _hasPacket ? 1 : 0;
    }

    virtual int read() {
        if (_hasPacket) {
            _hasPacket = false;
            return 0x42; // 'B'
        }
        return -1;
    }

    virtual int read(unsigned char* buffer, size_t len) {
        if (!_hasPacket) return 0;
        if (len > 0) {
            buffer[0] = 0x42; // 'B'
            _hasPacket = false;
            return 1;
        }
        return 0;
    }

    virtual int peek() {
        if (_hasPacket) return 0x42;
        return -1;
    }

    virtual void flush() {
        _hasPacket = false;
    }

    virtual IPAddress remoteIP() {
        return _remoteIp;
    }

    virtual uint16_t remotePort() {
        return _remotePort;
    }
};

// ===============================
// CWifi mock (équivalent de la classe WiFi dans WiFi.h)
// ===============================

class CWifi {
private:
    wl_status_t _status;
    unsigned long _timeout;
    MockAccessPoint _aps[3];
    int _scanCount;

    IPAddress _localIP;
    IPAddress _gatewayIP;
    IPAddress _subnetMask;
    IPAddress _dns1;
    IPAddress _dns2;
    IPAddress _softAPIP;

    const char* _ssid;
    const char* _apSsid;

public:
    CWifi() {
        _status = WL_DISCONNECTED;
        _timeout = 10000;
        _scanCount = 2;

        // on simule 2 réseaux scannés
        {
            // Réseau 0
            const char* s0 = "TestNetwork";
            int i=0;
            for (; s0[i] && i < WL_SSID_MAX_LENGTH; ++i) _aps[0].ssid[i] = s0[i];
            _aps[0].ssid[i] = '\0';
            _aps[0].rssi = -40;
            _aps[0].channel = 6;
            _aps[0].encryption_mode = ENC_TYPE_CCMP;
        }
        {
            // Réseau 1
            const char* s1 = "GuestWifi";
            int i=0;
            for (; s1[i] && i < WL_SSID_MAX_LENGTH; ++i) _aps[1].ssid[i] = s1[i];
            _aps[1].ssid[i] = '\0';
            _aps[1].rssi = -65;
            _aps[1].channel = 11;
            _aps[1].encryption_mode = ENC_TYPE_NONE;
        }

        _localIP   = IPAddress(192,168,1,42);
        _gatewayIP = IPAddress(192,168,1,1);
        _subnetMask= IPAddress(255,255,255,0);
        _dns1      = IPAddress(8,8,8,8);
        _dns2      = IPAddress(1,1,1,1);
        _softAPIP  = IPAddress(192,168,4,1);

        _ssid = "";
        _apSsid = "";
    }

    // ----- Connexion station -----

    int begin(const char* ssid) {
        _ssid = ssid;
        _status = WL_CONNECTED; // on simule succès instantané
        return _status;
    }

    int begin(const char* ssid, const char* passphrase) {
        (void)passphrase;
        _ssid = ssid;
        _status = WL_CONNECTED;
        return _status;
    }

    // ----- Point d'accès -----

    uint8_t beginAP(const char* ssid) {
        _apSsid = ssid;
        _status = WL_AP_LISTENING;
        return _status;
    }

    uint8_t beginAP(const char* ssid, uint8_t channel) {
        (void)channel;
        _apSsid = ssid;
        _status = WL_AP_LISTENING;
        return _status;
    }

    uint8_t beginAP(const char* ssid, const char* passphrase) {
        (void)passphrase;
        _apSsid = ssid;
        _status = WL_AP_LISTENING;
        return _status;
    }

    uint8_t beginAP(const char* ssid, const char* passphrase, uint8_t channel) {
        (void)passphrase;
        (void)channel;
        _apSsid = ssid;
        _status = WL_AP_LISTENING;
        return _status;
    }

    // ----- Config IP manuelle -----

    void config(IPAddress local_ip) {
        _localIP = local_ip;
    }

    void config(IPAddress local_ip, IPAddress dns_server) {
        _localIP = local_ip;
        _dns1 = dns_server;
    }

    void config(IPAddress local_ip, IPAddress dns_server, IPAddress gateway) {
        _localIP = local_ip;
        _dns1 = dns_server;
        _gatewayIP = gateway;
    }

    void config(IPAddress local_ip, IPAddress dns_server, IPAddress gateway, IPAddress subnet) {
        _localIP = local_ip;
        _dns1 = dns_server;
        _gatewayIP = gateway;
        _subnetMask = subnet;
    }

    void setDNS(IPAddress dns1) {
        _dns1 = dns1;
    }

    void setDNS(IPAddress dns1, IPAddress dns2) {
        _dns1 = dns1;
        _dns2 = dns2;
    }

    void setHostname(const char* name) {
        (void)name;
        // ignoré dans le mock
    }

    // ----- Déconnexion / arrêt -----

    int disconnect() {
        _status = WL_DISCONNECTED;
        return 0;
    }

    void end() {
        _status = WL_DISCONNECTED;
    }

    // ----- Infos réseau -----

    uint8_t* macAddress(uint8_t* mac) {
        // renvoie une fausse MAC
        mac[0]=0xDE; mac[1]=0xAD; mac[2]=0xBE;
        mac[3]=0xEF; mac[4]=0xFE; mac[5]=0xED;
        return mac;
    }

    IPAddress localIP() {
        return _localIP;
    }

    IPAddress subnetMask() {
        return _subnetMask;
    }

    IPAddress gatewayIP() {
        return _gatewayIP;
    }

    IPAddress dnsIP(int n = 0) {
        if (n==0) return _dns1;
        return _dns2;
    }

    IPAddress softAPIP() {
        return _softAPIP;
    }

    const char* SSID() {
        return _ssid;
    }

    uint8_t* BSSID(uint8_t* bssid) {
        // renvoie une fausse BSSID
        bssid[0]=0xAA; bssid[1]=0xBB; bssid[2]=0xCC;
        bssid[3]=0xDD; bssid[4]=0xEE; bssid[5]=0xFF;
        return bssid;
    }

    int32_t RSSI() {
        return -42;
    }

    const char* softAPSSID() {
        return _apSsid;
    }

    // ----- Scan WiFi -----

    int8_t scanNetworks() {
        // renvoie combien de réseaux simulés on a
        return (int8_t)_scanCount;
    }

    const char* SSID(uint8_t networkItem) {
        if (networkItem < (uint8_t)_scanCount) {
            return _aps[networkItem].ssid;
        }
        return "";
    }

    uint8_t encryptionType(uint8_t networkItem) {
        if (networkItem < (uint8_t)_scanCount) {
            return _aps[networkItem].encryption_mode;
        }
        return ENC_TYPE_UNKNOWN;
    }

    uint8_t encryptionType() {
        // encryption du réseau actuel
        return ENC_TYPE_CCMP;
    }

    uint8_t* BSSID(uint8_t networkItem, uint8_t* bssid) {
        if (networkItem < (uint8_t)_scanCount) {
            for (int i=0;i<6;i++) bssid[i]=_aps[networkItem].bssid[i];
        }
        return bssid;
    }

    uint8_t channel(uint8_t networkItem) {
        if (networkItem < (uint8_t)_scanCount) {
            return _aps[networkItem].channel;
        }
        return 0;
    }

    int32_t RSSI(uint8_t networkItem) {
        if (networkItem < (uint8_t)_scanCount) {
            return _aps[networkItem].rssi;
        }
        return -100;
    }

    // ----- Status / DNS / temps -----

    uint8_t status() {
        return _status;
    }

    uint8_t reasonCode() {
        // code de déauth simulé
        return 0;
    }

    int hostByName(const char* host, IPAddress& outIP) {
        (void)host;
        outIP = IPAddress(93,184,216,34); // ex: example.org
        return 1;
    }

    unsigned long getTime() {
        // timestamp fictif
        return 1730000000UL;
    }

    void setTimeout(unsigned long timeoutMs) {
        _timeout = timeoutMs;
    }

    // ----- Ping -----

    int ping(IPAddress ip, uint8_t ttl=128, uint8_t count=1) {
        (void)ip;
        (void)ttl;
        (void)count;
        // retourne "temps ms" simulé
        return 42;
    }

    int ping(const String& hostname, uint8_t ttl=128, uint8_t count=1) {
        (void)hostname;
        (void)ttl;
        (void)count;
        return 42;
    }

    int ping(const char* host, uint8_t ttl=128, uint8_t count=1) {
        (void)host;
        (void)ttl;
        (void)count;
        return 42;
    }

    // ----- Firmware -----

    static const char* firmwareVersion() {
        return "MOCK-0.0.1";
    }

    uint32_t firmwareVersionU32() {
        return 0x00000100; // juste un numéro bidon
    }
};

// ===============================
// L'instance globale WiFi
// ===============================
CWifi WiFi;
