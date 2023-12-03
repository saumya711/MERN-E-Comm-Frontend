import axios from "axios";

export const getOrders = async (authtoken) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/admin/orders`, {
            headers: {
                authtoken,
            },
        }
    );
}

export const updateOrderStatus = async (orderId, orderStatus, authtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/admin/update-order-status`, 
        { orderId, orderStatus },
        {
            headers: {
                authtoken,
            },
        }
    );
}