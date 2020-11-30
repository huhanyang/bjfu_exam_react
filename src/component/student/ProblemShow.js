import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Row, Image } from 'antd';
import "antd/dist/antd.css"

import '../common/Common.css'

class ProblemShow extends Component {

    problemShow = (props) => {
        if(props.problem == null) return (<></>)
        let problem = props.problem
        return (
            <div>
                <Row>
                    {'第'+problem.sort+'题'}
                </Row>
                <Row>
                    {problem.title}
                </Row>
                <Row>
                    {problem.material}
                </Row>
                <Row>
                    {
                        JSON.parse(problem.images).map(imageUrl => 
                            <Image src={"/exam-img/"+imageUrl}
                                width={200} />
                        )
                    }
                </Row>
            </div>
        )
    }

    render() {
        if(this.props.problem == null) {
            return (<></>)
        } else {
            return(
                <div>
                    <this.problemShow problem={this.props.problem.fatherProblem}/>
                    <this.problemShow problem={this.props.problem}/>
                </div>
            );
        }
    }

}

export default withRouter(ProblemShow)
