/**
 * @openapi
 * /books:
 *  get:
 *     servers:
 *     - url: http://localhost:3000
 *     tags:
 *     - Books
 *     description: Get a list of all book references stored
 *     responses:
 *       200:
 *         description: Books list successfully found
 *       404:
 *         description: There isn't any books stored
 *       500:
 *         description: Sever response error
 */

/**
 * @openapi
 * /books:
 *  post:
 *     servers:
 *     - url: http://localhost:3000
 *     tags:
 *     - Books
 *     description: Create a new book reference
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                required:
 *                  - username
 *                  - bookName
 *                  - pdfUrl
 *                  - isPublic
 *                properties:
 *                  username:
 *                    type: string
 *                  bookName:
 *                    type: string
 *                  pdfUrl:
 *                    type: string
 *                  isPublic:
 *                    type: boolean
 *     responses:
 *       201:
 *         description: New books reference stored successfully
 *       404:
 *         description: Bad request. The information given by the user doesn't fit the requirements
 *       500:
 *         description: Sever response error
 */
