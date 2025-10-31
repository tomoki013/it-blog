
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000")
    page.get_by_label("検索モーダルを開く").click()
    page.get_by_role("heading", name="Search Content").wait_for()
    page.get_by_placeholder("記事やトピックを検索...").fill("next")
    page.locator("ul > li").first.wait_for()
    page.screenshot(path="jules-scratch/verification/search_results.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
