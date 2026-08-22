export class ApiResponse{
    static build(status, message, data=null){
        return {
            status,
            message,
            data
        };
    }
}