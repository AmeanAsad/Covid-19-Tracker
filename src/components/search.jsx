import _ from 'lodash'
import faker from 'faker';
import React, { Component } from 'react'
import { Search, Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import { Redirect, Link, withRouter } from "react-router-dom";




const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

const source = [];

axios
    .get("http://covid19-informatics.com/get/search/",
        config)
    .then(res => {
        const users = res.data
        const form = users.map(user => {
            return {
                key: user.title,
                as: Link,
                to: `/info/${user.title}/`,
                title: user.title,
                description: user['description'],
            };
        });

        source.push((form));
    })
    .catch(err => {
        console.log(err)
    });


const initialState = { isLoading: false, results: [], value: '', load: false }



class SearchMenu extends Component {


    state = initialState



    handleResultSelect = (e, { result }) => {
        window.location.href = 'http://covid19-informatics.com/info/' + result.title
    }

    handleSearchChange = (e, { value }) => {

        this.setState({ isLoading: true, value, load: false })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source[0], isMatch),
            })
        }, 300)

    }

    render() {
        const { isLoading, value, results, load } = this.state


        return (


            <div>
                <Search
                    size='small'
                    placeholder={"Search for countries"}
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    // onMouseDown={this.mousedown}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                    })}
                    results={results}
                    value={value}
                    {...this.props}
                />
            </div>

        )



    }
}

export default SearchMenu;