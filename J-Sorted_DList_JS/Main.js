import { DLinked_List } from "./Doubly Linked List/DLinked_List.js";
import { DNode } from "./Doubly Linked List/DNode.js";

const list = new DLinked_List(7, 4, 6);

list.Add_At(new DNode(55), 2);
list.Add_At(new DNode(200), 3);

list.Push(new DNode(-5));
list.Push(new DNode(1));
list.Push(new DNode(2));
list.Pop();

list.Sort();

for (let i = 0; i < list.Size; i++)
{
    console.log(list.Get(i).Value);
}