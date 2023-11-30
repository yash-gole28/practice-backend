import UserModal from "../Modals/User.modal.js"

export const addCart = async(req , res)=>{
    try{
        const {productId , userId} = req.body
        if(!productId || !userId)return res.status(404).json({success:false , message:'no Id matched'})
        await UserModal.findByIdAndUpdate(userId , {cart:productId})
        return res.status(200).json({success:true , message:"product added to cart"})
   
   
    }catch(error){
       return res.status(500).json({success:false , message:error})
    }
}