import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiGetOrderByAccount } from "../../apis/user";
import { setOrders } from "../../store/user/userSlice";
import PaginationPage from "../../components/pagination/PaginationPage";
import { product } from "../../ultils/constants";
import moment from "moment";
const History = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const orders = useSelector((state) => state.user.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = product.orderHistoryLimit;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiGetOrderByAccount(userId);
        const sortedOrders = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        dispatch(setOrders(sortedOrders));
        const totalOrders = sortedOrders.length;
        setTotalPages(Math.ceil(totalOrders / pageSize));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [dispatch, userId, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, orders.length);
  const currentOrders = orders.slice(startIndex - 1, endIndex);

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-bold py-4 border-b border-b-blue-800">
        Order History
      </header>

      <table className="table-auto w-full mt-12">
        <thead>
          <tr className="text-center  bg-[#7fad39] text-white border-white py-2">
            <th className="py-2 border-r-2">STT</th>
            <th className="py-2 border-r-2">Product Name</th>
            <th className="text-center py-2 border-r-2">Product Image</th>
            <th className="py-2 border-r-2">Price</th>
            <th className="py-2 border-r-2">Quantity</th>
            <th className="py-2 border-r-2">Total</th>
            <th className="py-2 border-r-2">Ordered day</th>
          </tr>
        </thead>

        <tbody>
          {currentOrders.map((order, orderIndex) =>
            order.orderDetailDTOs.map((orderDetail, detailIndex) => (
              <tr key={`${orderIndex}-${detailIndex}`} className="border-2">
                {detailIndex === 0 && (
                  <td
                    className="text-center py-2 border-r-2"
                    rowSpan={order.orderDetailDTOs.length}
                  >
                    {startIndex + orderIndex}
                  </td>
                )}

                <td className="text-center py-2 border-r-2">
                  {orderDetail.product.name}
                </td>
                <td className="py-2 border-r-2">
                  <img
                    src={orderDetail.product.images[0]}
                    alt={orderDetail.product.name}
                    className="w-20 h-20 rounded-md object-cover flex mx-auto"
                  />
                </td>
                <td className="text-center py-2 border-r-2">
                  {orderDetail.product.price + "💲"}
                </td>
                <td className="text-center py-2 border-r-2">
                  {orderDetail.quantity}
                </td>
                {detailIndex === 0 && (
                  <td
                    className="text-center py-2 border-r-2"
                    rowSpan={order.orderDetailDTOs.length}
                  >
                    {order.total + "💲"}
                  </td>
                )}

                {detailIndex === 0 && (
                  <td
                    className="text-center py-2 border-r-2"
                    rowSpan={order.orderDetailDTOs.length}
                  >
                    {moment(order.createdAt)?.format("DD/MM/YYYY  HH:mm")}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-10">
        <PaginationPage
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default History;
