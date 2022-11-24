import User from "./User.js";
import Item from "./Item.js";
import List from "./List.js";

User.hasMany(List);
List.belongsTo(User);

List.hasMany(Item);
Item.belongsTo(List);

export { User, List, Item };
