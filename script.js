 const TEST_DURATION = 10000;
const SAMPLE_INTERVAL = 1000;
const TEST_FILE_URL = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg";

const liveSpeed = document.getElementById("liveSpeed");
const resultEl = document.getElementById("result");
const extraInfo = document.getElementById("extraInfo");

    async function runSpeedSample() {
      try {
        const controller = new AbortController();
        const response = await fetch(TEST_FILE_URL + '?cache=' + Math.random(), { signal: controller.signal });
        const reader = response.body.getReader();
        let received = 0;
        const start = performance.now();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value.length;
        }

        const end = performance.now();
        const duration = (end - start) / 1000;
        return (received * 8) / duration / 1024 / 1024; // Mbps
      } catch {
        return 0;
      }
    }

    async function getPing() {
      try {
        const start = performance.now();
        await fetch("https://corsproxy.io/?https://example.com", { method: "HEAD" });
        const end = performance.now();
        return Math.round(end - start);
      } catch {
        return "N/A";
      }
    }

    async function getIPv4() {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
      } catch {
        return "N/A";
      }
    }

    async function getIPv6() {
      try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
      } catch {
        return "N/A";
      }
    }

    async function getIPInfo() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        return await res.json();
      } catch {
        return { org: "N/A", city: "N/A", region: "N/A", country_name: "N/A" };
      }
    }

    async function measureLiveSpeed() {
      let speeds = [];
      const startTime = Date.now();

      while (Date.now() - startTime < TEST_DURATION) {
        const speed = await runSpeedSample();
        speeds.push(speed);
        liveSpeed.textContent = `Speed: ${speed.toFixed(2)} Mbps`;
        await new Promise(r => setTimeout(r, SAMPLE_INTERVAL));
      }

      if (speeds.length >= 3) {
        speeds.sort((a, b) => a - b);
        speeds = speeds.slice(1, -1);
      }

      const avgSpeed = (speeds.reduce((a, b) => a + b, 0) / speeds.length).toFixed(2);
      const ping = await getPing();
      const ipv4 = await getIPv4();
      const ipv6 = await getIPv6();
      const ipInfo = await getIPInfo();

      resultEl.innerHTML = `
        <p><span class="label">Average Download Speed:</span> ${avgSpeed} Mbps</p>
        <p><span class="label">Ping:</span> ${ping} ms</p>
        <p><span class="label">Your IP (IPv4):</span> ${ipv4}</p>
        <p><span class="label">Your IP (IPv6):</span> ${ipv6}</p>
        <p><span class="label">Your ISP:</span> ${ipInfo.org}</p>
      `;

      extraInfo.innerHTML = `
        <p><span class="label">City:</span> ${ipInfo.city}</p>
        <p><span class="label">Region:</span> ${ipInfo.region}</p>
        <p><span class="label">Country:</span> ${ipInfo.country_name}</p>
      `;
    }

    measureLiveSpeed();
