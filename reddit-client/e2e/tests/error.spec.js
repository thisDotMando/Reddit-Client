import { Builder, By, until } from "selenium-webdriver";

const APP_URL = "http://localhost:5173/";

async function run() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(APP_URL);
    console.log("🌐 Seite geladen");

    // Error künstlich dispatchen
    await driver.executeScript(() => {
      window.store.dispatch({
        type: "posts/fetchPosts/rejected",
        error: { message: "Test Error" },
      });
    });

    console.log("⚠️ Error-State simuliert");

    // Auf Error-UI warten
    await driver.wait(until.elementLocated(By.css(".error-state")), 10000);

    console.log("✅ Error E2E Test erfolgreich");
  } catch (err) {
    console.error("❌ Error E2E Test fehlgeschlagen:", err);
  } finally {
    await driver.quit();
  }
}

run();
