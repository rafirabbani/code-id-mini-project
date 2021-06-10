import { Router } from 'express'
import IndexController from '../Controllers/IndexController'

const cart = IndexController.CartsController
const lineItem = IndexController.LineItemsController
const router = Router()

// Create New Open Cart and Add New Line Item
router.post('/cart/create', cart.openCart, lineItem.checkLineItem, lineItem.newLineItem, cart.getAllCartsByUser)

// Update Existing Cart With New Line Item
router.put('/cart/update/additem/:cart_id', cart.updateCart, lineItem.checkLineItem, lineItem.newLineItem,cart.getAllCartsByUser)

// Get All Open Carts
router.get('/cart/open', cart.getAllOpenCarts)

// Get All Close Carts
router.get('/cart/close', cart.getAllCloseCarts)

// Get All Open Carts for Single User
router.get('/cart/user/:user_id', cart.getAllCartsByUser)

// Update Existing Line Item On Single Carts
router.put('/cart/update/edititem/:line_item_id', lineItem.updateLineItem, cart.getOneCart)

// Delete Cart

// Sum Items On Cart
router.get('/cart/sum/:cart_id', cart.sumLineItems, lineItem.sumLineItems)

// Check Out
router.put('/cart/checkout/:cart_id', cart.updateCart, lineItem.bulkUpdateLineItems, cart.getOneCart)

export default router