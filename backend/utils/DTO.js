function mongoDBToApiDTO(product) {
  return {
    name: product.name,
    quantity: product.quantity,
    id: product._id,
  };
}

module.exports = {mongoDBToApiDTO};
