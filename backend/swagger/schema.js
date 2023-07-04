module.exports={
    
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         name:
 *           type: string
 *           description: name of user
 *         email:
 *           type: string
 *           description: email of user
 *         gender:
 *           type: string
 *           description: gender of user
 *         address:
 *           type: string
 *           description: address of user
 *         company:
 *           type: string
 *           description: company user belonged to
 *         company_id:
 *           type: string
 *           description: company 's id
 *         password:
 *           type: string
 *           description: password of user
 *         role:
 *           type: string
 *           description: role of user
 *       example:
 *         id: d5fE_asz
 *         name: Hans Flutter
 *         email: Admin@example.com
 *         gender: Femail
 *         role: Admin
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         name:
 *           type: string
 *           description: name of customer
 *         email:
 *           type: string
 *           description: email of customer
 *         gender:
 *           type: string
 *           description: gender of customer
 *         address:
 *           type: string
 *           description: address of customer
 *         company:
 *           type: string
 *           description: company customer belonged to
 *         company_id:
 *           type: string
 *           description: company 's id
 *         avatar:
 *           type: string
 *           description: company 's id
 *         
 *       example:
 *         id: d5fE_asz
 *         name: Hans Flutter
 *         email: Admin@example.com
 *         gender: Femail
 *         role: Admin
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - amount
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         amount:
 *           type: string
 *           description: amount of transaction
 *         type:
 *           type: string
 *           description: type of transaction
 *         date:
 *           type: string
 *           description: date of transaction
 *         company:
 *           type: string
 *           description: company       
 *       example:
 *         id: d5fE_asz
 *         amount: $10000
 *         description: transaction
 *         date: 23 July 2023
 */


}