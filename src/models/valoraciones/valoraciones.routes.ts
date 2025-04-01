import { Router } from 'express';
import {
  createValoracion,
  getAllValoracionesPaginated,
  updateValoracion,
  getValoracion,
  deleteValoracion
} from './valoraciones.controller';

const router = Router();

/**
 * @swagger
 * /valoraciones:
 *   post:
 *     summary: Crea una nova valoració
 *     tags: [valoraciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               calendar:
 *                 type: string
 *               valoracion:
 *                 type: number
 *               used:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Valoració creada
 *       404:
 *         description: User not found
 *       405:
 *         description: Calendar not found
 *       500:
 *         description: Error en crear la valoració
 */
router.post("", createValoracion);

/**
 * @swagger
 * /valoraciones/:
 *   get:
 *     summary: Obtenir valoracions per ID d'usuari
 *     tags: [valoraciones]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of valoraciones per page (default 5)
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Id of the user
 *     responses:
 *       200:
 *         description: Valoracions trobades
 *       404:
 *         description: No s'han trobat valoracions
 *       500:
 *         description: Error en obtenir les valoracions
 */
router.get("/", getAllValoracionesPaginated);

/**
 * @swagger
 * /valoraciones/{valoracionId}:
 *   get:
 *     summary: Obtenir una valoració per ID
 *     tags: [valoraciones]
 *     parameters:
 *       - in: path
 *         name: valoracionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la valoració
 *     responses:
 *       200:
 *         description: Valoració trobada
 *       404:
 *         description: Valoració no trobada
 *       500:
 *         description: Error en obtenir la valoració
 */
router.get("/:valoracionId", getValoracion);

/**
 * @swagger
 * /valoraciones/{valoracionId}:
 *   put:
 *     summary: Actualitzar una valoració per ID
 *     tags: [valoraciones]
 *     parameters:
 *       - in: path
 *         name: valoracionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la valoració
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valoracion:
 *                 type: number
 *               used:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Valoració actualitzada
 *       404:
 *         description: Valoració no trobada
 *       500:
 *         description: Error en actualitzar la valoració
 */
router.put("/:valoracionId", updateValoracion);

/**
 * @swagger
 * /valoraciones/{valoracionId}:
 *   delete:
 *     summary: Eliminar una valoració per ID
 *     tags: [valoraciones]
 *     parameters:
 *       - in: path
 *         name: valoracionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la valoració
 *     responses:
 *       200:
 *         description: Valoració eliminada
 *       404:
 *         description: Valoració no trobada
 *       500:
 *         description: Error en eliminar la valoració
 */
router.delete("/:valoracionId", deleteValoracion);

export default router;