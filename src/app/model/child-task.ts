export class ChildTask {
    childTaskID:number;
    public childTaskName:string;
    public taskStartDate:Date
    public taskEndDate:Date;
    public taskPriority:number;
    public taskStatus:boolean;
    public project:Object;
    public parent:Object;
    public user:Object;
}
