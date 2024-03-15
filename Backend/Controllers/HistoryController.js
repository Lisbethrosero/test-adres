const dataSource = require('./../utils/db');

const getHistoryAll = async (req, res) => {
  try {
    let search = req.query.search;
    let type = req.query.type;
    let processsearch = 'CREATE';
    let data = null;
    data =  dataSource.getRepository('history').createQueryBuilder('history')
    .leftJoinAndSelect('history.type', 'typeService') 
    .leftJoinAndSelect('history.suppliers', 'suppliers') 
    .leftJoinAndSelect('history.units', 'units')
    switch (type) {
      case 'CREATE':
        data = await data.where("history.budget like '%"+search+"%'")
        .andWhere('history.process = :processsearch', { processsearch: type }).getMany()
        break;
      case 'UPDATE':
        data = await data.where("typeService.name like '%"+search+"%'")
        .andWhere('history.process = :processsearch', { processsearch: type }).getMany()
        break;
      case 'DELETE':
        data = await data.where("suppliers.name like '%"+search+"%'")
        .andWhere('history.process = :processsearch', { processsearch: type }).getMany()
        break;   
      default:
        data = await data.getMany()
    }
    return res.status(200).json({ success: 1, data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const getId = async (req, res) => {
  try {
    const history = await dataSource.getRepository('history').findBy({id:req.params.id});
    return res.status(200).json({ success: 1, data: history });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

module.exports = { getHistoryAll, getId };
