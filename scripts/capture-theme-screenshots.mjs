import { chromium } from "playwright";
import { spawn } from "child_process";
import { mkdirSync } from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "artifacts", "theme-screenshots");
mkdirSync(outDir, { recursive: true });

async function setTheme(page, theme) {
  await page.evaluate((value) => {
    localStorage.setItem("bbs-theme", value);
    document.documentElement.setAttribute("data-theme", value);
  }, theme);
}

async function capture(page, name) {
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(outDir, name), fullPage: false });
}

async function main() {
  const server = spawn("npm", ["run", "start"], {
    cwd: process.cwd(),
    stdio: "pipe",
    env: { ...process.env, PORT: "3000" },
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const browser = await chromium.launch();
  const desktop = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });

  try {
    await desktop.goto("http://localhost:3000/pl", { waitUntil: "networkidle" });
    await setTheme(desktop, "dark");
    await capture(desktop, "homepage-dark-desktop.png");

    await setTheme(desktop, "light");
    await capture(desktop, "homepage-light-desktop.png");

    await desktop.goto("http://localhost:3000/pl/specjalizacje", {
      waitUntil: "networkidle",
    });
    await setTheme(desktop, "light");
    await capture(desktop, "specializations-light-desktop.png");

    await desktop.goto("http://localhost:3000/pl/kontakt", {
      waitUntil: "networkidle",
    });
    await setTheme(desktop, "light");
    await capture(desktop, "contact-light-desktop.png");

    await mobile.goto("http://localhost:3000/pl", { waitUntil: "networkidle" });
    await setTheme(mobile, "dark");
    await capture(mobile, "homepage-dark-mobile.png");

    await setTheme(mobile, "light");
    await capture(mobile, "homepage-light-mobile.png");

    const menuBtn = mobile.locator("header button").last();
    await menuBtn.click();
    await mobile.waitForTimeout(500);
    await capture(mobile, "mobile-menu-light.png");
  } finally {
    await browser.close();
    server.kill("SIGTERM");
  }

  console.log(`Screenshots saved to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
