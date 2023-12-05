export const cashOnDelReducer = (state = false, action) => {
    switch (action.type) {
        case "CASH_ON_DELIVER":
            return action.payload;
        default:
            return state;
    }
}