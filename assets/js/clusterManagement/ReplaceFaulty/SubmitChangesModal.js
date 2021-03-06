// Copyright (C) 2015-2016 Skylable Ltd. <info-copyright@skylable.com>
// License: MIT, see LICENSE for more details.

import { PropTypes } from 'react'
import { connect } from 'react-redux'

import BaseCommandModal from '../BaseCommandModal'
import { getNodesMarkedForReplacement } from '../reducers'


const mapStateToProps = state => ({
    nodes: getNodesMarkedForReplacement(state)
        .map(
            node => ({
                ...node,
                publicIp: node.newPublicIp,
                internalIp: node.newInternalIp,
            })
        ),
})

@connect(mapStateToProps)
export default class SubmitChangesModal extends BaseCommandModal {
    static propTypes = {
        nodes: PropTypes.array.isRequired,
    }
    urlName = 'replaceFaultyNodes'
    modalTitle = __("Submit changes?")
    triggerText = __("Submit changes")
    submitText = __("Submit")
    triggerClassName = 'btn btn-primary'

    getFormData = () => ({
        nodes: this.props.nodes,
    })

    isTriggerDisabled = () => (this.props.nodes.length === 0)
}
