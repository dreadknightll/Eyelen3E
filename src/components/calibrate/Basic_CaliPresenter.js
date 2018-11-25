function Basic_CaliPresenter() {
    this.m_initA1 = 0;
    this.m_initA2 = 0;
    this.m_locked = false;
    this.m_a1 = 0;
    this.m_a2 = 0;
    this.m_a1Set = false;
    this.m_a2Set = false;
    this.m_a2Enabled = false;
    this.m_oldValues = new Array();
    this.m_lastValueTag = -1;
    this.m_ovTopTag = -1;
    this.m2_newValRecd = true;
    this.setInitA1 = function (ia1) {
        if (!this.validateInput(ia1)) {
            return;
        }
        this.m_initA1 = ia1;
        if (!this.m_a1Set) {
            this.m_a1 = this.m_initA1;
            this.m_a1Set = true;
        }
        if (this.m_lastValueTag < 0) {
            this.m_lastValueTag = 0;
            this.m_oldValues[0] = ia1;
            this.m_ovTopTag = 0;
        }
    };
    this.setInitA2 = function (ia2) {
        if (!this.validateInput(ia2)) {
            return;
        }
        this.m_initA2 = ia2;
        if (!this.m_a2Set) {
            this.m_a2 = this.m_initA2;
            this.m_a2Set = true;
        }
    };
    this.lock = function () {
        this.m_locked = true;
    };
    this.unlock = function () {
        this.m_locked = false;
    };
    this.getA1 = function () {
        return this.m_a1;
    };
    this.inputA1 = function (a1) {
        if (!this.validateInput(a1)) {
            return;
        }
        if (this.m_locked) {
            return;
        }
        if (!this.m_a1Set) {
            this.m_lastValueTag = 0;
            this.m_oldValues[this.m_lastValueTag] = a1;
            this.m_ovTopTag = 0;
        }
        else {
            this.m2_newValRecd = false;
        }
        this.m_a1 = a1;
        this.m_a1Set = true;
    };
    this.undoA1 = function () {
        if (this.m_lastValueTag > 0 && this.m2_newValRecd)
            --this.m_lastValueTag;
        this.m_a1 = this.m_oldValues[this.m_lastValueTag];
        this.m2_newValRecd = true;
    };
    this.redoA1 = function () {
        if (!this.m2_newValRecd) {
            return;
        }
        if (this.m_lastValueTag < this.m_ovTopTag) {
            ++this.m_lastValueTag;
        }
        else {
        }
        this.m_a1 = this.m_oldValues[this.m_lastValueTag];
    };
    this.recA1 = function () {
        ++this.m_lastValueTag;
        this.m_oldValues[this.m_lastValueTag] = this.m_a1;
        this.m_ovTopTag = this.m_lastValueTag;
        this.m2_newValRecd = true;
    };
    this.enableA2 = function () {
        this.m_a2Enabled = true;
    };
    this.disableA2 = function () {
        this.m_a2Enabled = false;
    };
    this.a2Enabled = function () {
        return this.m_a2Enabled;
    };
    this.getA2 = function () {
        if (this.m_a2Enabled) {
            return this.m_a2;
        }
        else {
            return this.m_a1;
        }
    };
    this.inputA2 = function (a2) {
        if (!this.validateInput(a2)) {
            return;
        }
        if (this.m_locked) {
            return;
        }
        if (!this.m_a2Enabled) {
            return;
        }
        this.m_a2 = a2;
        this.m_a2Set = true;
    };
    this.resetValues = function () {
        this.m_a1 = this.m_initA1;
        this.m_a2 = this.m_initA2;
        this.m_locked = false;
        this.m_a2Enabled = false;
        this.m_a1Set = false;
        this.m_a2Set = false;
    };
    this.validateInput = function (v) {
        if ("number" == typeof (v)) {
            if (isNaN(v)) {
                return false;
            }
            if (v <= 0) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    };
}
//# sourceMappingURL=Basic_CaliPresenter.js.map