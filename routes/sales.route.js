const express = require('express');
const router = express.Router()

const {Sales} = require('../models/sale.model')

// Get all sales

async function fetchAllSales() {
  try {
    const sales = await Sales.find({})
    return {message: 'Successfully fetched all sales' ,sales}
  } catch (error) {
    return {message:'Failed to fetch all sales', error}
  }
}

router.get('/',async(req,res)=>{
  try{
    const sales = await fetchAllSales()

    if (sales.message === 'Successfully fetched all sales') {
      res.status(200).json(sales);
    } else {
      res.status(404).json(sales)
    }
    
    
  }catch(err){
     res.status(500).json({ message:"Failed to fetch data" })
  }
})

// Add sale

async function addSale(saleData) {
  try {
    const sale = new Sales(saleData)
    const newSale = await sale.save()
    
    return {message: 'Successfully added a new sale' ,newSale}
  } catch (error) {
    return {message:'Failed to add a new sale', error}
  }
}

router.post('/',async(req,res)=>{
  try{
    const sale = await addSale(req.body);

    if (sale.message === 'Successfully added a new sale') {
      res.status(201).json(sale)
    } else {
      res.status(404).json(sale)
    }
    
  }catch(err){
     res.status(500).json({ message:"Failed to fetch data" })
  }
})

// Delete sale

async function deleteSale(saleId) {
  try {
    const sale = await Sales.findByIdAndDelete(saleId)
    
    return {message: 'Successfully removed from sales' ,sale}
  } catch (error) {
    return {message: 'Failed to remove the item from sales'}
  }
}

router.delete('/:saleId',async(req,res)=>{
  try{
    const sales = await deleteSale(req.params.saleId)

    if (sales.message === 'Successfully removed from sales') {
      res.status(200).json(sales)
    } else {
      res.status(404).json(sales)
    }
    
  }catch(err){
    res.status(500).json({ message:"Failed to fetch data" })
  }
})


// Export router

module.exports = router