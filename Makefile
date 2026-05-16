.PHONY: deploy-core

DIR = apps/core-app

deploy-core:
	cd $(DIR) && pnpm build && pnpm dlx wrangler deploy