import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Row, Image, Divider } from 'antd';
import "antd/dist/antd.css"

import '../common/Common.css'

class ProblemShow extends Component {

    problemShow = (props) => {
        if(props.problem == null) return (<></>)
        let problem = props.problem
        return (
            <div>
                <Row>
                    <h1>{'第'+problem.sort+'题'}</h1>
                </Row>
                <Row>
                    <h2>{problem.title}</h2>
                </Row>
                <Row>
                    <h2>{problem.material}</h2>
                </Row>
                <Row>
                    {
                        JSON.parse(problem.images).map(imageUrl => 
                            <Image src={"/exam-img/"+imageUrl}
                                width={400} />
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
                    {this.props.problem.fatherProblem == null?<></>:<Divider>子题干</Divider>}
                    <this.problemShow problem={this.props.problem}/>
                </div>
            );
        }
    }

}

export default withRouter(ProblemShow)
