import React, { Component } from 'react';

export default class AfternoonJobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            morning: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDM2NS40IDM2NS40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNjUuNCAzNjUuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yODMuMTAxLDE1Mi4xbDI2LjgtMjYuOGMzLjgtMy44LDMuOC05LjYsMC0xMy40Yy0zLjgtMy44LTkuNjAxLTMuOC0xMy40LDBsLTI2LjgsMjYuOGMtMy44LDMuOC0zLjgsOS42LDAsMTMuNCAgICBDMjczLjYwMSwxNTUuOSwyODEuMiwxNTUuOSwyODMuMTAxLDE1Mi4xeiIgZmlsbD0iI0Q4MDAyNyIvPgoJCTxwYXRoIGQ9Ik0xODEuOCwxMTUuN2M1LjcsMCw5LjYwMS0zLjgsOS42MDEtOS42VjY3LjljMC01LjctMy44LTkuNi05LjYwMS05LjZjLTUuOCwwLTkuNiwzLjgtOS42LDkuNnYzOC4yICAgIEMxNzIuMiwxMTEuOSwxNzcuOSwxMTUuNywxODEuOCwxMTUuN3oiIGZpbGw9IiNEODAwMjciLz4KCQk8cGF0aCBkPSJNMzA4LDI0MGMwLDUuNjk5LDMuOCw5LjYsOS42MDEsOS42SDM1NS44YzUuNywwLDkuNjAxLTMuOCw5LjYwMS05LjZjMC01LjgwMS0zLjgtOS42MDEtOS42MDEtOS42MDFoLTM4LjE5OSAgICBDMzExLjgsMjMwLjUsMzA4LDIzNi4yLDMwOCwyNDB6IiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHBhdGggZD0iTTM1My45LDI4Ny45SDkuNmMtMy44LDAtOS42LDMuOC05LjYsOS42MDFjMCw1LjgsNS43LDkuNiw5LjYsOS42aDM0NC4yYzUuNywwLDkuNjAxLTMuOCw5LjYwMS05LjYgICAgQzM2My40LDI5MS43LDM1OS42MDEsMjg3LjksMzUzLjksMjg3Ljl6IiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHBhdGggZD0iTTkuNiwyNDkuNmgzOC4yYzUuNywwLDkuNi0zLjgsOS42LTkuNmMwLTUuODAxLTMuOC05LjYwMS05LjYtOS42MDFIOS42QzMuOSwyMzAuNCwwLDIzNi4xLDAsMjQwICAgIEMwLjEsMjQ1LjgsMy45LDI0OS42LDkuNiwyNDkuNnoiIGZpbGw9IiNEODAwMjciLz4KCQk8cGF0aCBkPSJNODAuNCwxNTIuMWMzLjgsMy44LDkuNiwzLjgsMTMuNCwwYzMuOC0zLjgsMy44LTkuNiwwLTEzLjRMNjcsMTExLjljLTMuOC0zLjgtOS42LTMuOC0xMy40LDBjLTMuOCwzLjgtMy44LDkuNiwwLDEzLjQgICAgTDgwLjQsMTUyLjF6IiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHBhdGggZD0iTTc4LjUsMjQ5LjZoMjEwLjRjMC0zLjgsMC01LjcsMC05LjZjMC01Ny40LTQ3LjgtMTA1LjItMTA1LjItMTA1LjJjLTU3LjQsMC0xMDUuMiw0Ny44LTEwNS4yLDEwNS4yICAgIEM3Ni42LDI0My45LDc2LjYsMjQ1LjgsNzguNSwyNDkuNnoiIGZpbGw9IiNEODAwMjciLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K',
            afternoon: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMzY1LjQgMzY1LjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM2NS40IDM2NS40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTU3LjQsMTgxLjhjMC01LjY5OS0zLjgtOS42LTkuNi05LjZIOS42Yy01LjcsMC05LjYsNS43LTkuNiw5LjZjMCw1LjcsMy44LDkuNjAxLDkuNiw5LjYwMWgzOC4yICAgIEM1My42LDE5MS4zLDU3LjQsMTg3LjUsNTcuNCwxODEuOHoiIGZpbGw9IiNGRkRBNDQiLz4KCQk8cGF0aCBkPSJNODAuNCwyNjkuN2wtMjYuOCwyNi44Yy0zLjgsMy44LTMuOCw5LjYwMSwwLDEzLjRjMy44LDMuOCw5LjYsMy44LDEzLjQsMGwyNi44LTI2LjhjMy44LTMuODAxLDMuOC05LjYwMSwwLTEzLjQgICAgQzkwLDI2Ny44LDg0LjIsMjY1LjksODAuNCwyNjkuN3oiIGZpbGw9IiNGRkRBNDQiLz4KCQk8cGF0aCBkPSJNMjgzLjEwMSw5My44TDMwOS45LDY3YzMuOC0zLjgsMy44LTkuNiwwLTEzLjRjLTMuOC0zLjgtOS42MDEtMy44LTEzLjQsMGwtMjYuOCwyNi44Yy0zLjgsMy44LTMuOCw5LjYsMCwxMy40ICAgIEMyNzMuNjAxLDk3LjYsMjgxLjIsOTcuNiwyODMuMTAxLDkzLjh6IiBmaWxsPSIjRkZEQTQ0Ii8+CgkJPHBhdGggZD0iTTE4MS44LDU3LjRjNS43LDAsOS42MDEtMy44LDkuNjAxLTkuNlY5LjZjMC01LjctMy44LTkuNi05LjYwMS05LjZjLTMuOCwwLTkuNiwzLjgtOS42LDkuNnYzOC4yICAgIEMxNzIuMiw1My42LDE3Ny45LDU3LjQsMTgxLjgsNTcuNHoiIGZpbGw9IiNGRkRBNDQiLz4KCQk8cGF0aCBkPSJNODAuNCw5My44YzMuOCwzLjgsOS42LDMuOCwxMy40LDBjMy44LTMuOCwzLjgtOS42LDAtMTMuNEw2Nyw1My42Yy0zLjgtMy44LTkuNi0zLjgtMTMuNCwwYy0zLjgsMy44LTMuOCw5LjYsMCwxMy40ICAgIEw4MC40LDkzLjh6IiBmaWxsPSIjRkZEQTQ0Ii8+CgkJPHBhdGggZD0iTTE4MS44LDMwOGMtNS42OTksMC05LjYsMy44LTkuNiw5LjYwMVYzNTUuOGMwLDUuNywzLjgsOS42MDEsOS42LDkuNjAxYzUuODAxLDAsOS42MDEtMy44LDkuNjAxLTkuNjAxdi0zOC4xOTkgICAgQzE5MS4zLDMxMS44LDE4Ny41LDMwOCwxODEuOCwzMDh6IiBmaWxsPSIjRkZEQTQ0Ii8+CgkJPHBhdGggZD0iTTM1NS44LDE3Mi4yaC0zOC4xOTljLTUuNywwLTkuNjAxLDMuOC05LjYwMSw5LjZjMCw1LjgwMSwzLjgsOS42MDEsOS42MDEsOS42MDFIMzU1LjhjNS43LDAsOS42MDEtMy44LDkuNjAxLTkuNjAxICAgIEMzNjUuNCwxNzcuOSwzNTkuNjAxLDE3Mi4yLDM1NS44LDE3Mi4yeiIgZmlsbD0iI0ZGREE0NCIvPgoJCTxwYXRoIGQ9Ik0yODMuMTAxLDI2OS43Yy0zLjgwMS0zLjgtOS42MDEtMy44LTEzLjQsMHMtMy44LDkuNiwwLDEzLjRsMjYuOCwyNi44YzMuOCwzLjgsOS42MDEsMy44LDEzLjQsMHMzLjgtOS42MDEsMC0xMy40ICAgIEwyODMuMTAxLDI2OS43eiIgZmlsbD0iI0ZGREE0NCIvPgoJCTxjaXJjbGUgY3g9IjE4MS44IiBjeT0iMTgxLjgiIHI9IjEwNS4yIiBmaWxsPSIjRkZEQTQ0Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=='
        };
    }
    render() {
        return (
            <div>
                <div className="clear"></div>
                <hr />
                <img src={this.state.afternoon} alt="morgning" style={{ zIndex: 0, width: '16px', marginTop: '43px' }} />
                {this.props.jobsNumber || 0} | {this.props.employeeNumber || 0}
            </div>
        );
    }
}
