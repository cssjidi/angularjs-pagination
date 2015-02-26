app
	.service('PaginationService',function(){
        var _current = 1,      //当前页
             _total = 0,       //总记录
             _count = 20,      //每页记录
            _groupNum = 5,    //超过多少页才分组
            _groupCurrent = 1; //选择第几组
        this.setCount = function(count){ //设置分页记录数
            _count = parseInt(count);
            this.setPage(1);
        };
        this.setGroupNum = function(count){ //设置分页记录数
            _groupNum = parseInt(count);
        };
        this.groupSize = function(){ //分页组数
            //if(this.pageSize() <= _groupNum) return;
            return Math.ceil(parseInt(this.pageSize())/parseInt(_groupNum));
        };
        this.getCurrent = function(){ //获取当前页
            return _current;
        };
        this.getCurrentGroup = function(){ //当前组
            return _groupCurrent;
        };
        this.getCount = parseInt(_count); //获取分页记录数
        this.setTotal = function(total){ //设置总记录数
            _total = total;
        };
        this.getTotal = function(){ //获取总记录数
            return _total;
        };
        this.pageSize = function(){ //页数
            return Math.ceil(parseInt(_total)/parseInt(_count));
        };
        this.setPage = function(current){ //选择页数
            if(current > this.pageSize() || current === 0 ) return;
            _current = current;
            _groupCurrent = Math.ceil(_current / _groupNum);
            this.numList();
        };
        this.isFirst = function(){ //是否第一页
            return parseInt(_current) === 1;
        };
        this.isFirstGroup = function(){ //是否第一组
            return parseInt(_groupCurrent) === 1;
        };
        this.nextGroup = function(){
            if(this.isLastGroup()) return;
                _groupCurrent++;
        };
        this.prevGroup = function(){
            if(this.isFirstGroup()) return;
                _groupCurrent--;
        }
        this.isLastGroup = function(){ //是否最后一组
            return parseInt(_groupCurrent) === parseInt(this.groupSize());
        }
        this.firstPage = function(){ //第一页
            if(this.isFirst()) return;
            _current = 1;
            this.setPage(_current)
            this.numList();
        };
        this.isLast = function(){ //是否最后一页
            return parseInt(_current) === this.pageSize();
        };
        this.lastPage = function(){ //最后一页
            if(this.isLast()) return;
            _current = this.pageSize();
            this.setPage(_current)
            this.numList();
        };
        this.prevPage = function(){ //上一页
            if(this.isFirst()) return;
            _current--;
            this.setPage(_current);
            this.numList();
        }
        this.nextPage = function(){ //下一页
            if(this.isLast()) return;
            _current++;
            this.setPage(_current);
            this.numList();
            this.numList();
        };
        this.numList = function(){ //页数
            var groupArr = {},
                startPage = _groupNum*(_groupCurrent - 1) + 1,
                endPage = Math.min((_groupCurrent * _groupNum),this.pageSize()),
                newList = [];
            for(var i = startPage; i <= endPage; i++){
                var newArr = {
                    text: i,
                    page: i,
                    limit: _count
                }
                newList.push(newArr);
            }
            if(startPage > 1){
                groupArr = {
                    text: '...',
                    page: _groupNum*(_groupCurrent - 1),
                    limit: _count
                }
                newList.unshift(groupArr);
            }
            if(endPage < this.pageSize()){
                groupArr = {
                    text: '...',
                    page: _groupCurrent*_groupNum + 1,
                    limit: _count
                }
                newList.push(groupArr);
            }
            return newList;
        };

    });