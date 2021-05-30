import { sequelize } from '../../config/config-db'

// Create New Open Cart
const openCart = async (req, res, next) => {
    try {
        const checkOpenCart = await req.context.models.Carts.findAll({
            where: { cart_user_id: req.body.cart_user_id, cart_status: 'OPEN' },
        })
        if (checkOpenCart.length > 0) {
            return res.status(400).send(`You Still Unfinished Transactions`)
        }
        else {
            try {
                const date = await sequelize.query(`SELECT CURRENT_DATE`, { 
                    type: sequelize.QueryTypes.SELECT })
                if (date) { 
                    try {
                        const result = await req.context.models.Carts.create({
                            cart_created_on: date[0].current_date,
                            cart_status: 'OPEN',
                            cart_user_id: req.body.cart_user_id
                        })
                        if (result) {
                            req.params.cart_id = result.cart_id
                            req.params.id = req.body.cart_user_id
                            next()
                        }
                        //console.log(result)
                        //return res.send(result)
                    }
                    catch (err) {
                        console.log(err)
                        return res.status(500).send('Something Went Wrong When Creating Cart')
                    }
                }
            }
            catch (err) {
                console.log(err)
                return res.status(500).send('Something Happenend')
            }
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(`Something Went Wrong`)
    }
    
}

// Update Cart
const updateCart =  async (req, res, next) => {
    try {
        const result = await req.context.models.Carts.findOne({
            where: { cart_id: req.params.cart_id, cart_status: 'OPEN' }
        })
        if(result) {
            await req.context.models.Carts.update({
                cart_status: req.body.cart_status
            }, { where: { cart_id: result.cart_id }
            })
            //req.cart = req.params.cart_id
            req.params.user_id = result.cart_user_id
            //console.log(result)
            next()
        }
        else {
            return res.status(404).send('Cart Not Found')
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

//Get All Open Carts
const getAllCarts = async (req, res) => {
    try {
        const result = await req.context.models.Carts.findAll({
            where: { cart_status: 'OPEN' },
            include: req.context.models.Line_Items
        })
        return res.send(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

// Get All Open Carts For Single User
const getAllCartsByUser = async (req, res, next) => {
    try {
        const result = await req.context.models.Carts.findAll({
            where: { cart_user_id: req.params.user_id, cart_status: 'OPEN' },
            include: req.context.models.Line_Items
        })
        //req.items = result.line_items
        //next()
        return res.send(result)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Something Went Wrong')
    }
}

// Sum Line Items On Cart
const sumLineItems = async (req, res, next) => {
    try {
        const result = await req.context.models.Carts.findOne({
            where: { cart_id: req.params.cart_id },
            include : req.context.models.Line_Items
        })
        if (result) {
            req.items = result.line_items
            next()
        }
        else {
            return res.send(404).send('Cart Not Found')
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Something Went Wrong')
    }
}

export default {
    openCart,
    updateCart,
    getAllCarts,
    getAllCartsByUser,
    sumLineItems
}