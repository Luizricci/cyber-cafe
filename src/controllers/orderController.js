const OrderList = require("../models/orderList");
const Order = require("../models/order");

const pedido = new OrderList();

pedido.addOrder(new Order(2, "Coxinha", 5.00, "Preparando"));
pedido.addOrder(new Order(1, "Coca Cola", 5.00, "Pendente"));

const router = {
    addOrder: (req, res) => {
        try {
            const { quantity, item, price } = req.body;
            if (!quantity || !item || !price) {
                throw new Error("Preencha todos os campos para adicionar um pedido");
            }
            const order = new Order(quantity, item, price, "Pendente");
            pedido.addOrder(order);
            return res.status(201).json({ message: "Pedido adicionado com sucesso", order });
        } catch (error) {
            res.status(400).json({ message: "Erro ao adicionar pedido", error });
        }
    },
    getAllOrders: (req, res) => {
        try {
            const orders = pedido.getAllOrders();
            return res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: "Erro ao buscar pedidos", error });
        }
    },
    getOrderById: (req, res) => {
        try {
            const {id} = req.params;
            const order = pedido.getOrderById(id);
            return res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: "Erro ao buscar pedido", error });
        }
    },
    deleteOrder: (req, res) => {
        try {
            
            pedido.deleteOrder(req.params.id);
            res.status(200).json({ message: "Pedido deletado com sucesso"});
        } catch (error) {
            res.status(404).json({ message: "Erro ao deletar pedido", error });
        }
    }
}

module.exports = router;