const Request = require('../models/request.model')

const getRequests = async (req, res) => {
  const page = Math.max(1, req.query.page) || 1
  const size = Math.max(1, req.query.size) || 25
  const offset = (page - 1) * size
  
  try {
    const requests = await Request.findAll({
      limit: size,
      offset: offset,
    })
    
    if (requests.length > 0) {
      res.status(200).json({requests})
      
    } else {
      res.status(404).json({message: "No requests found"})
    }
    
  } catch (error) {
    res.status(500).json({error})
  }
}

const getRequestsByGroupId = async (req, res) => {
  const page = Math.max(1, req.query.page) || 1
  const size = Math.min(1, req.query.size) || 25
  const offset = (page - 1) * size
  
  try {
    const { group } = req.params
    const request = await Request.findAll({
      where: {
        group_id: group
      },
      limit: size,
      offset: offset,
    })
    
    if (request.length > 0) {
      res.status(200).json({request})
    } else {
      res.status(404).json({message: "No requests found"})
    }
    
  } catch (error) {
    res.status(500).json({error})
  }
}

const getRequestsBySymbol = async (req, res) => {
  const page = Math.max(1, req.query.page) || 1
  const size = Math.min(1, req.query.size) || 25
  const offset = (page - 1) * size
  
  try {
    const { symbol } = req.params
    const request = await Request.findAll({
      where: {
        symbol: symbol
      },
      limit: size,
      offset: offset,
    })
    
    if (request.length > 0) {
      res.status(200).json({request})
    } else {
      res.status(404).json({message: "No requests found"})
    }
    
  } catch (error) {
    res.status(500).json({error})
  }
}

const getRequestsBySeller = async (req, res) => {
  const page = Math.max(1, req.query.page) || 1
  const size = Math.min(1, req.query.size) || 25
  const offset = (page - 1) * size
  
  try {
    const { symbol } = req.params
    const request = await Request.findAll({
      where: {
        seller: parseInt(symbol)
      },
      limit: size,
      offset: offset,
    })
    
    if (request.length > 0) {
      res.status(200).json({request})
    } else {
      res.status(404).json({message: "No requests found"})
    }
    
  } catch (error) {
    res.status(500).json({error})
  }
}

const postRequests = async (req, res) => {
  try {
    const request = req.body;
    
    if (!request) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    
    const { request_id, group_id, symbol, datetime, deposit_token, quantity, seller } = request;
    
    if (
      !request_id ||
      !group_id ||
      !symbol ||
      !datetime ||
      deposit_token === undefined ||
      !quantity ||
      seller === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    await Request.create({
      request_id,
      group_id,
      symbol,
      datetime,
      deposit_token,
      quantity,
      seller,
    });
    
    res.status(201).json({ message: `Request ${request_id} @ ${datetime} created successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};




module.exports = {
  getRequests,
  postRequests,
  getRequestsByGroupId,
  getRequestsBySymbol,
  getRequestsBySeller
}
