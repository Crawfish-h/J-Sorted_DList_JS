import { DNode } from "./DNode.js";

export class DLinked_List
{
    constructor(root_Value, initial_Size= 0, others_Value, sort_Func)
    {
        this.Root_Node;
        this.Last_Node;
        this.Size = 0;
        this.Sort_Func = sort_Func || this.Default_Sort_Func;

        if (initial_Size > 0)
        {
            this.Push(new DNode(root_Value));
        }

        for (let i = 1; i < initial_Size; i++)
        {
            this.Push(new DNode(others_Value));
        }
    }

    // When adding a node, the node already in the list is moved forward rather than backwards.
    // Thus, it is impossible to add a node to the front to the list (a last node).
    // So, use Push() for that.
    // ^^^ most of this is incorrect!! lololol.
    Add_At(node= new DNode, index, use_Sorting= false, is_Forward= true)
    {
        if (index > this.Size)        
        {
            throw("FATAL ERROR: index for DLinked_List out of range!! index: " + index);
        }

        if (use_Sorting == true)
        {
            let index_Of_Node = 0;
            for (let i = 0; i < this.Size; i++)
            {
                if (this.Sort_Func(node, this.Get(i)) == true)
                {
                    index_Of_Node = i + 1;
                }else
                {
                    break;
                }
            }

            if (index_Of_Node > index + 1)
            {
                index_Of_Node = index + 1;
            }

            index = index_Of_Node;
        }

        if (index != this.Size)
        {
            let indexed_Node = this.Get(index, is_Forward);

            node.Prev_Node = indexed_Node.Prev_Node;
            node.Next_Node = indexed_Node;

            if (indexed_Node.Prev_Node != undefined)
            {
                indexed_Node.Prev_Node.Next_Node = node;
            }

            indexed_Node.Prev_Node = node;

            if (index == 0)
            {
                this.Root_Node = node;
            }

            this.Size++;
        }else
        {
            this.Push(node);
        }
    }

    Push(node= new DNode)
    {
        if (this.Size == 0)
        {
            this.Root_Node = node;
            this.Last_Node = node;
        }else
        {
            let prev_Node = this.Last_Node;
            prev_Node.Next_Node = node;
            node.Prev_Node = prev_Node;
            this.Last_Node = node;
        }

        this.Size++;
    }

    Pop()
    {
        if (this.Size == 1)
        {
            this.Root_Node = null;
            this.Last_Node = null;
        }else if (this.Size > 1)
        {
            let prev_Node = this.Last_Node.Prev_Node;
            this.Last_Node.Prev_Node.Next_Node = null;
            this.Last_Node.Prev_Node = null;
            this.Last_Node = prev_Node;
        }

        if (this.Size > 0)
        {
            this.Size--;
        }
    }

    Get(index= 0, is_Forward= true)
    {
        if (index > this.Size - 1 || index < 0)
        {
            throw("FATAL ERROR: index for DLinked_List out of range!! index: " + index);
        }

        if (is_Forward == true)
        {
            return this.Get_Forward_(index);
        }else
        {
            return this.Get_Backward_(index);
        }
    }

    Get_Forward_(index)
    {
        let indexed_Node = this.Root_Node;
        for (let i = 0; i < index; i++)
        {
            if (indexed_Node.Next_Node != undefined)
            {
                indexed_Node = indexed_Node.Next_Node;
            }
        }

        return indexed_Node;
    }

    Get_Backward_(index)
    {
        let indexed_Node = this.Last_Node;
        for (let i = 0; i < index; i++)
        {
            if (indexed_Node.Prev_Node != undefined)
            {
                indexed_Node = indexed_Node.Prev_Node;
            }
        }

        return indexed_Node;
    }

    Sort()
    {
        let list = new DLinked_List(undefined, 0, undefined);
        let list_Index = 0;
        for (let i = 0; i < this.Size; i++)
        {
            if (list.Size == 0)
            {
                list_Index = 0;
            }else
            {
                list_Index = list.Size - 1;
            }

            list.Add_At(new DNode(this.Get(i).Value), list_Index, true);
        }

        this.Root_Node = list.Root_Node;
        this.Last_Node = list.Last_Node;

        list.Root_Node = null;
        list.Last_Node = null;
        list = null;
    }

    Default_Sort_Func(sort_Node= new DNode, other_Node= new DNode)
    {
        if (sort_Node.Value > other_Node.Value)
        {
            return true;
        }else
        {
            return false;
        }
    }
}

/*
export class DLinked_List
{
    constructor(root_Value= undefined, initial_Size= 0, others_Value, sort_Func)
    {
        this.Size = 0;
        this.Sort_Func = sort_Func || this.Default_Sort_Func;
        this.Root_Node;
        this.Last_Node;

        for (let i = 0; i < initial_Size; i++)
        {
            if (i == 0)
            {
                this.Push(new DNode(root_Value));
            }else
            {
                this.Push(new DNode(others_Value - i));
            }
        }
    }

    Get(index= 0)
    {
        if (index > this.Size - 1 || index < 0)
        {
            throw("FATAL ERROR: index for DLinked_List out of range!!");
        }

        let indexed_Node = this.Root_Node;
        for (let i = 0; i < index; i++)
        {
            if (indexed_Node.Next_Node != undefined)
            {
                indexed_Node = indexed_Node.Next_Node;
            }
        }

        return indexed_Node;
    }

    Default_Sort_Func(sort_Node= new DNode, other_Node= new DNode)
    {
        if (sort_Node.Value > other_Node.Value)
        {
            return true;
        }else
        {
            return false;
        }
    }

    Push_Sort(node= new DNode)
    {
        //console.log(node);
        if (this.Size == 0)
        {
            this.Root_Node = node;
            this.Last_Node = this.Root_Node;
            this.Root_Node.Is_Root = true;
            //console.log("Value: " + node.Value);
        }else
        {
            let index_To_Add = -1;
            for (let i = 0; i < this.Size; i++)
            {
                if (this.Default_Sort_Func(node, this.Get(i)) == false)
                {
                    if (i - 1 == -1)
                    {
                        index_To_Add = 0;
                    }else
                    {
                        index_To_Add = i - 1;
                    }
                }
            }
            //console.log(node.Value);
            if (index_To_Add == -1)
            {
                this.Push(node);
                console.log("Push");
                //this.Add_At(node, this.Size - 1);
            }else
            {
                this.Add_At(node, index_To_Add);
            }

            
            if (this.Sort_Func(node, this.Last_Node) == true)
            {
                //this.Last_Node.Next_Node = node;
                //node.Prev_Node = this.Last_Node;
                //this.Last_Node = node;

                this.Push(node);
            }else
            {
                let last_Node = this.Last_Node;
                this.Pop();
                this.Push(node);
                this.Push(last_Node);

                /*node.Next_Node = this.Last_Node;
                node.Prev_Node = this.Last_Node.Prev_Node;

                if (this.Last_Node.Is_Root == true)
                {
                    this.Last_Node.Prev_Node.Next_Node = node;
                    this.Last_Node.Prev_Node = node;
                }

                if (this.Last_Node.Prev_Node != undefined)
                {
                    this.Last_Node.Prev_Node.Next_Node = node;
                    this.Last_Node.Prev_Node = node;
                }
            }
        }

        //console.log(node);
        this.Size++;
    }

    // Returns false if there are no changes made to the list.
    Sort_List()
    {
        if (this.Size == 0)
        {
            return false;
        }else
        {
            let list = new DLinked_List();
            for (let i = 0; i < this.Size; i++)
            {
                list.Push_Sort(new DNode(this.Get(i).Value));
            }

            for (let i = 0; i < this.Size; i++)
            {
                let node = this.Get(i); // Replace this with a reverse Get().
                node.Prev_Node = null;
                node.Next_Node = null;
                node.Value = null;
            }

            //console.log(list.Get(4).Next_Node);

            //console.log(list.Get(4));

            this.Root_Node = list.Root_Node;
            this.Last_Node = list.Last_Node;

            list.Root_Node = null;
            list.Last_Node = null;

            return true;
        }

        return false;
    }

    Push(node= new DNode)
    {
        if (this.Size == 0)
        {
            this.Root_Node = node;
            this.Last_Node = this.Root_Node;
            this.Root_Node.Is_Root = true;
        }else
        {
            this.Last_Node.Next_Node = node;
            node.Prev_Node = this.Last_Node;
            this.Last_Node = node;
        }

        this.Size++;
    }

    Pop()
    {
        this.Get(this.Size - 1).Prev_Node = null;

        if (this.Size > 1)
        {
            this.Last_Node = this.Get(this.Size - 2);
            this.Get(this.Size - 2).Next_Node = null;
        }else
        {
            this.Last_Node = null;
            if (this.Size == 1) 
            {
                this.Last_Node = this.Get(this.Size - 1);
                this.Root_Node = this.Get(this.Size - 1);
            }
        }

        this.Size--;
    }

    Add_At(node= new DNode, index= 0)
    {
        if (index != this.Size - 1)
        {
            if (index + 1 < this.Size)
            {
                node.Next_Node = this.Get(index);
                this.Get(index).Prev_Node = node;
            }

            if (index == this.Size - 1)
            {
                this.Last_Node = node;
            }

            if (index != 0)
            {
                node.Prev_Node = this.Get(index - 1);
                this.Get(index - 1).Next_Node = node;
            }

            if (index == 0)
            {
                this.Root_Node = node;
            }
            this.Size++;
        }else
        {
            this.Push(node);
        }
    }

    Remove_At(index)
    {
        let removed_Node = this.Get(index);
        let prev_Node = this.Get(index - 1);

        if (index + 1 < this.Size)
        {
            let next_Node = this.Get(index + 1);
            next_Node.Prev_Node = prev_Node;
            prev_Node.Next_Node = next_Node;
        }else
        {
            prev_Node.Next_Node = null;
        }



        removed_Node.Next_Node = null;
        removed_Node.Prev_Node = null;
        removed_Node.Value = null;

        this.Size--;
    }
}*/

