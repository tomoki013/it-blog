import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the home page
        await page.goto("http://localhost:3000")
        await page.wait_for_load_state("networkidle")
        await page.screenshot(path="jules-scratch/verification/screenshot_home_top.png")

        # Scroll down on the home page
        await page.evaluate("window.scrollBy(0, 200)")
        await asyncio.sleep(1) # Wait for scroll effect
        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

asyncio.run(main())
