-- CreateTable
CREATE TABLE `carrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carrito_detalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_carrito` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direcciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `calle` VARCHAR(25) NOT NULL,
    `numero_exterior` VARCHAR(5) NULL,
    `numero_interior` VARCHAR(5) NULL,
    `ciudad` VARCHAR(25) NOT NULL,
    `estado` VARCHAR(25) NOT NULL,
    `codigo_postal` VARCHAR(5) NOT NULL,
    `pais` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orden_detalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_orden` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordenes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_direccion` INTEGER NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `estado` ENUM('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado') NULL DEFAULT 'pendiente',
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(20) NOT NULL,
    `descripcion` TEXT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL,
    `marca` VARCHAR(20) NULL,
    `capacidad` INTEGER NULL,
    `id_categoria` INTEGER NULL,
    `imagen_url` VARCHAR(100) NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resenas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `calificacion` INTEGER NULL,
    `comentario` TEXT NULL,
    `imagen_url` VARCHAR(100) NULL,
    `fecha` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,
    `correo` VARCHAR(30) NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `telefono` VARCHAR(10) NULL,
    `rol` ENUM('cliente', 'admin') NULL DEFAULT 'cliente',
    `fecha_registro` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carrito` ADD CONSTRAINT `carrito_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carrito_detalle` ADD CONSTRAINT `carrito_detalle_id_carrito_fkey` FOREIGN KEY (`id_carrito`) REFERENCES `carrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carrito_detalle` ADD CONSTRAINT `carrito_detalle_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direcciones` ADD CONSTRAINT `direcciones_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden_detalle` ADD CONSTRAINT `orden_detalle_id_orden_fkey` FOREIGN KEY (`id_orden`) REFERENCES `ordenes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden_detalle` ADD CONSTRAINT `orden_detalle_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordenes` ADD CONSTRAINT `ordenes_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordenes` ADD CONSTRAINT `ordenes_id_direccion_fkey` FOREIGN KEY (`id_direccion`) REFERENCES `direcciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `productos_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resenas` ADD CONSTRAINT `resenas_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resenas` ADD CONSTRAINT `resenas_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
