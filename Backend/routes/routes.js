const express = require('express');
const router = express.Router();
let type = require('./../Controllers/TypeController');
let suppliers = require('./../Controllers/SuppliersController');
let units = require('./../Controllers/UnitsController');
let history = require('./../Controllers/HistoryController');
let butgets = require('./../Controllers/BudgestController');
let login = require('./../Controllers/LoginController');

router.post("/type/create", type.CreateType);
router.get("/type/get-all", type.getTypeAll);
router.put("/type/update/:id", type.UpdateType);
router.delete("/type/delete/:id", type.DeleteType);
router.get("/type/:id", type.getId);

router.post("/suppliers/create", suppliers.CreateSuppliers);
router.get("/suppliers/get-all", suppliers.getSuppliersAll);
router.put("/suppliers/update/:id", suppliers.UpdateSuppliers);
router.delete("/suppliers/delete/:id", suppliers.DeleteSuppliers);
router.get("/suppliers/:id", suppliers.getId);

router.post("/units/create", units.CreateUnits);
router.get("/units/get-all", units.getUnitsAll);
router.put("/units/update/:id", units.UpdateUnits);
router.delete("/units/delete/:id", units.DeleteUnits);
router.get("/units/:id", units.getId);

router.get("/history/get-all", history.getHistoryAll);
router.get("/history/:id", history.getId);

router.post("/butgets/create", butgets.CreateBudges);
router.get("/butgets/get-all", butgets.getBudgesAll);
router.put("/butgets/update/:id", butgets.UpdateBudges);
router.delete("/butgets/delete/:id", butgets.DeleteBudges);
router.get("/butgets/:id", butgets.getId);
router.put("/butgets/edit/:id", butgets.EditBudges);
router.put("/butgets/changestate/:id", butgets.ChangeStateBudges);

router.post("/login", login.login);

module.exports = router;