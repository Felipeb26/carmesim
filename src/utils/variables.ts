
export const API_HOST = process.env.API_HOST || "https://batsworks-carmesim.onrender.com/v1/"
export const API_KEY = process.env.API_KEY
export const CAPTCHA_TOKEN = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY

export const DEFAULT_HEADER = {
	"Content-Type": "application/json",
	"Accept": "application/json",
}