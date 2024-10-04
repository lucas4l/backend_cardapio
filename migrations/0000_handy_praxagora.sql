CREATE TABLE IF NOT EXISTS "cliente" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"mesa_cliente" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pedido" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_product" (
	"order_id" text NOT NULL,
	"product_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "produto" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mesa" (
	"id" text PRIMARY KEY NOT NULL,
	"numero_mesa" integer NOT NULL,
	"pedido" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cliente" ADD CONSTRAINT "cliente_mesa_cliente_mesa_id_fk" FOREIGN KEY ("mesa_cliente") REFERENCES "public"."mesa"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_product" ADD CONSTRAINT "order_product_order_id_pedido_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."pedido"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_product" ADD CONSTRAINT "order_product_product_id_produto_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."produto"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mesa" ADD CONSTRAINT "mesa_pedido_pedido_id_fk" FOREIGN KEY ("pedido") REFERENCES "public"."pedido"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
