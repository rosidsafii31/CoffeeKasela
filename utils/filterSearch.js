const filterSearch = ({router, page, sort, }) => {
    const path = router.pathname;
    const query = router.query;


    if(page) query.page = page;
    if(sort) query.sort = sort;

    router.push({
        pathname: path,
        query: query
    })
}

export default filterSearch