import ProductModal from "../Modals/Product.modal.js"
import UserModal from "../Modals/User.modal.js"

export const addCart = async (req, res) => {
    try {
        const { productId, userId } = req.body
        if (!productId || !userId) return res.status(404).json({ success: false, message: 'no Id matched' })


        await UserModal.findByIdAndUpdate(userId, { $push: { cart: productId } })
        return res.status(200).json({ success: true, message: "product added to cart" })


    } catch (error) {
        return res.status(500).json({ success: false, message: "already exist" })
    }
}

export const getCart = async (req, res) => {
    try {
        const { id } = req.body
        const user = await UserModal.findById(id).select("-_id cart")
        if (!user) return res.status(404).json({ success: false, message: "user not found" })
        if (user) {
            const yourCart = []
            for (var i = 0; i < user.cart.length; i++) {

                const cartdata = await ProductModal.findById(user.cart[i])
                yourCart.push(cartdata)

            }
            // if(!cartdata)return res.status(400).json({success:false , message:"failed to load data"})
            console.log(yourCart)
            return res.status(200).json({ success: true, message: "your cart data ", yourCart })

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}


export const deleteCart = async (req, res) => {
    try {
        const { productId, userId } = req.body
        if (!productId || !userId) return res.status(404).json({ success: false, message: 'no Id matched' })

        const user = await UserModal.findById(userId)
        if (!user) return res.status(404).json({ success: false, message: "User not found.." })

        const index = user.cart.indexOf(productId);
        user.cart.splice(index, 1)
        await user.save();

        var userCart = []
        for (var i = 0; i < user.cart.length; i++) {
            const productData = await ProductModal.findById(user.cart[i])
            userCart.push(productData)
        }

        return res.status(200).json({ success: true, message: "product deleted from cart", products: userCart })


    } catch (error) {
        return res.status(500).json({ success: false, message: "already exist" })
    }
}