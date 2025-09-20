const WebModel = require("../models/webModel");

const CreateWeb = async (req, res) => {
  const { name, url, description, tags } = req.body;
  try {
    const webs = await WebModel.findOne({url});
    if(webs) return res.status(409).json({
      status: false,
      message: "This Web entry already exists!",
    });
    const newWeb = new WebModel({ name, url, description, tags });
    await newWeb.save(); //save the data
    res.status(201).json({
      status: true,
      message: "Web entry created successfully",
      data: newWeb,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
    console.log("error during new web entry creation",error)
  }
};

const ReadWeb = async (req, res) => {
  try {
    const webs = await WebModel.find(); //find the data
    if (req.admin) {
      console.log("sending data with admin status (ReadWeb - WebController)");
      res.status(200).json({
        webs: webs,
        isAdmin: true,
        user: req.admin,
      });
    } else {
      console.log("sending data WITHOUT admin status (ReadWeb - WebController)");
      res.status(200).json({
        webs:webs,
        isAdmin:false
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const UpdateWeb = async (req, res) => {
  const { id } = req.params;
  const { name, url, description, tags } = req.body;

  try {
    const updatedWeb = await WebModel.findByIdAndUpdate(
      id,
      { name, url, description, tags },
      { new: true }
    ); // here new:true is used to show new updated value

    if (!updatedWeb) {
      return res
        .status(404)
        .json({ status: false, message: "Web entry not found" });
    }

    res.status(200).json({
      status: true,
      message: "Web entry updated successfully",
      data: updatedWeb,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const DeleteWeb = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedWeb = await WebModel.findByIdAndDelete(id);
    if (!deletedWeb) {
      return res
        .status(404)
        .json({ status: false, message: "Web entry not found" });
    }
    res.status(200).json({
      status: true,
      message: "Web entry deleted successfully",
      data: deletedWeb,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const SearchWeb = async (req, res) => {
  // /web/search?name=someName use this to search
  const { name } = req.query;
  try {
    const webs = await WebModel.find({ name: new RegExp(name, "i") }); // 'i' for case-insensitive search
    if (webs.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No web entries found" });
    }
    res.status(200).json(webs);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  CreateWeb,
  ReadWeb,
  UpdateWeb,
  DeleteWeb,
  SearchWeb,
};
