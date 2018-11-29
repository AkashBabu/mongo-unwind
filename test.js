const {expect} = require('chai')
const deepEq = require('deep-equal')

const unwind = require('.')

const data = {
  a : 1,
  innObj1 : {
      arr1 : [1,2,3,4],
      innObj2 : {
          arr2 : [5,6,7,8]
      },
      arr3: [{b:1}, {c:2}]
  }
}


describe('mongo-unwind', () => {
  it('should unwind an array just like mongo $unwind', () => {
    const unwinded = unwind(data, 'innObj1.innObj2.arr2')

    expect(unwinded).to.be.of.length(data.innObj1.innObj2.arr2.length)
    unwinded.forEach((item, i) => {
      expect(item.a).to.be.eq(data.a)
      expect(deepEq(item.innObj1.arr1, data.innObj1.arr1)).to.be.true
      expect(item.innObj1.innObj2.arr2).to.be.eql(data.innObj1.innObj2.arr2[i])
    })
  })
  it('should be able to unwind array of objects', () => {
    const unwinded = unwind(data, 'innObj1.arr3')
  
    expect(unwinded).to.be.of.length(data.innObj1.arr3.length)
    unwinded.forEach((item, i) => {
      expect(item.a).to.be.eq(data.a)
      expect(deepEq(item.innObj1.arr1, data.innObj1.arr1)).to.be.true
      expect(deepEq(item.innObj1.arr3, data.innObj1.arr3[i])).to.be.true
    })
    
  })
  it('should return the same object if the given keypath does not exist', ()=> {
    const unwinded = unwind(data, 'wrong.path')
    
    expect(unwinded).to.be.of.length(1)
    expect(deepEq(unwinded[0], data)).to.be.true
  })
  it('should return the same object if the given keypath is an object', () => {
    const unwinded = unwind(data, 'innObj1')
    
    expect(unwinded).to.be.of.length(1)
    expect(deepEq(unwinded[0], data)).to.be.true

  })
})