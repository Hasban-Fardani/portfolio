import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";
import { github } from "emdash/auth/providers/github";
import { google } from "emdash/auth/providers/google";

export default defineConfig({
	site: "https://hasban.my.id",
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		sitemap({
			filter: (page) => !page.includes("/_emdash/") && !page.includes("/api/"),
		}),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
			authProviders: [github(), google()],
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Plus Jakarta Sans",
			cssVariable: "--font-heading",
			weights: [400, 500, 600, 700, 800],
			fallbacks: ["system-ui", "sans-serif"],
		},
	],
	devToolbar: { enabled: false },
});
