let id = 0;

const generateId = () => {
  id += 1;
  return id;
};

export default generateId;