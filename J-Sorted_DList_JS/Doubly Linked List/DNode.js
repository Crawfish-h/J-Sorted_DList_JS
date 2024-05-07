export class DNode
{
    constructor(value, prev_Node, next_Node)
    {
        this.Prev_Node = prev_Node;
        this.Next_Node = next_Node;
        this.Value = value;
        this.Is_Root = false;
        this.Is_Last = false;
    }

    Clone()
    {
        let cloned_node = new DNode(this.Value, this.Prev_Node, this.Next_Node)
        return cloned_node;
    }
}