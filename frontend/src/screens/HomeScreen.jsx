import React from 'react'
import { Row, Col } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {

  const {pageNumber, keyword} = useParams();

  // Destructures the result of useGetProductsQuery() into three variables:
  // data: products - Renames data to products
  // isLoading: Boolean indicating if the request is still loading.
// error: Holds error information if the API call fails.
const {data, isLoading, error} = useGetProductsQuery({keyword, pageNumber});
  return (
    <>
    {!keyword ? <ProductCarousel /> : (<Link to='/' className='btn btn-light mb-4'>Go Back</Link>)}
    {isLoading ? (
      <Loader/>
    ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (
    <>
    <h1>Latest Products</h1>
    <Row>
        {data.products.map((Object) => (
            // in small screen it takes 12 units (1 row), medium - 6 units (2 rows), large - 4 units (3 rows), extra large screens- 3 units (4 rows)
            <Col key= {Object._id}sm={12} md={6} lg={4} xl={3}>

                {/* passing an object as a prop named product  */}
                <Product product={Object} />
            </Col>
        ))}
    </Row>
    <Paginate pages={data.pages} page={data.page} keyword = {keyword ? keyword : ''}/>
    </>)
    }
    
    </>
  )
}

export default HomeScreen