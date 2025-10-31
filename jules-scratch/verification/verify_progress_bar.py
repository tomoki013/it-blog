from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000/blog/rsc-and-nextjs-app-router")

    # ページを一番下までスクロールしてプログレスバーを完全に表示させる
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

    # プログレスバーが表示されるのを待つ
    page.wait_for_timeout(1000)

    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
