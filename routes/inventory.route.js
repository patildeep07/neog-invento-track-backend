const express = require('express');
const router = express.Router()

const {Inventory} = require('../models/inventory.model')

// Get items

async function getAllItems() {
  try {
    const items = await Inventory.find({})
    return {message:'All items in inventory', items}
  } catch (error) {
    return {message:'Error fetching all items', error}
  }
}

router.get('/', async (req, res) => {
  try {
    const foundItems = await getAllItems()

    if (foundItems.message === 'All items in inventory') {
      res.status(200).json(foundItems);
    } else {
      res.status(404).json(foundItems)
    }
    
    
  } catch (err){
    res.status(500).json({ message:"Failed to fetch data" });
  }
})

// Add items

async function addItem(itemData) {
  try {
    const item = new Inventory(itemData)
    const newItem = await item.save()
    return {message: 'Successfully added a new item' ,newItem}
  } catch (error) {
    return {message: 'Failed to add item', error}
    console.log(error)
  }
}

router.post('/',async(req,res)=>{
  try{
    const addedItem = await addItem(req.body);

    console.log(addedItem)

    if (addedItem.message === 'Successfully added a new item') {
      res.json(addedItem);
    } else {
      res.status(404).json(addedItem)
    }
    
  }catch(err){
     res.status(500).json({ message:"Failed to fetch data" })
  }
})

// Edit item

async function editItem(itemId, itemData) {
  try {
    const newItem = await Inventory.findByIdAndUpdate(itemId, itemData, {new:true})
    

    
    return {message: 'Successfully updated item' ,newItem}
  } catch (error) {
    return {message:'Failed to edit item', error}
  }
}

router.post('/:itemId',async(req,res)=>{
  try{
    const updatedItem = await editItem(req.params.itemId,req.body);

    console.log(updatedItem)

    if (updatedItem.message === 'Successfully updated item') {
      res.json(updatedItem)
    } else {
      res.status(404).json(updatedItem)
    }
      
  }catch(err){
     res.status(500).json({ message:"Failed to fetch data" })
    console.log(err)
  }
})

// Delete item

async function deleteItem(itemId) {
  try {
    const item = await Inventory.findByIdAndDelete(itemId)
    return {message: 'Successfully deleted item' ,item}
  } catch (error) {
    return {message: 'Failed to delete the item', error}
  }
}

router.delete('/:itemId',async(req,res)=>{
  try{
    const deletedItem = await deleteItem(req.params.itemId);

    if (deletedItem.message === 'Successfully deleted item') {
      res.json(deletedItem)
    } else {
      res.status(402).json(deletedItem)
      console.log(deletedItem)
    }
    
  }catch(err){
     res.status(500).json({ message:"Failed to fetch data" })
    console.log(err)
  }
})

// Return router

module.exports = router