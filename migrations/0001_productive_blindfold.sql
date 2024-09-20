CREATE TABLE IF NOT EXISTS "pedido" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cliente" ADD COLUMN "table" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cliente" ADD COLUMN "demand" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cliente" ADD CONSTRAINT "cliente_demand_pedido_id_fk" FOREIGN KEY ("demand") REFERENCES "public"."pedido"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
