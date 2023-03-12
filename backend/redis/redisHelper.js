function getRedisKey(queryType, req) {
  const productId = req.params.studentId || req.query.studentId || req.body.studentId;

  if (queryType === REDIS_QUERY_TYPE.GET_PRODUCT) {
    return `GET_PRD_${productId}`;
  } else if (queryType === REDIS_QUERY_TYPE.GET_PRODUCTS) {
    return `GET_PRDS`;
  } else {
    throw new Error('Key not defined for redis.');
  }
}

const REDIS_QUERY_TYPE = {
  GET_PRODUCT: 'GET_PRODUCT',
  GET_PRODUCTS: 'GET_PRODUCTS',
};

module.exports = {getRedisKey, REDIS_QUERY_TYPE};
