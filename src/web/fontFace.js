// Register an "attribute" transform to codify the font's details
// as named attributes.
module.exports = {
  type: 'attribute',
  transformer: prop => {
      return ({
      category: prop.path[0],
      type: 'custom-fontStyle',
      family: prop.path[2],
      weight: prop.path[3],
      style: prop.path[4]
    })
  }
}
