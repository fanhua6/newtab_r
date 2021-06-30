import React from 'react'
import './index.scss'
import TypeItem from './TypeItem'

const ShortcutTypes = props => {
	const {
		sysShortcutTypes,
		currentTypeId,
		setCurrentTypeId
	} = props
	
	return (
		<div className="shortcut-types">
			{
				sysShortcutTypes.length > 0 &&
				sysShortcutTypes.map(i => 
					<TypeItem
						key = {i._id}
						item = {i}
						currentTypeId = { currentTypeId }
						setCurrentTypeId = { setCurrentTypeId }
					/>
				)
			}
		</div>
	)
}

export default ShortcutTypes