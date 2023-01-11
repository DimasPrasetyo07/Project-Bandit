<script>
export default {
    name: 'Sidebar'
}
</script>

<template>

<!-- SIDEBAR SECTION -->

<nav
    class="col-md-3 col-lg-2 d-md-block bg-light mx-3 my-3 py-2 px-2 sidebar collapse"
    id="sidebar-menu"
  >
    <div class="position-sticky">
      <ul class="nav flex-column">
        <li class="nav-item bg-light">
          <a class="nav-link active"
            >Which Gundam Timeline you are looking for?</a
          >
          <div class="form-floating" style="width: 232px">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option selected disabled>Pick One</option>
              <option value="1">Universal Century</option>
              <option value="2">Anno Domini</option>
              <option value="3">Cosmic Era</option>
            </select>
            <label for="floatingSelect">Gundam Timeline</label>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="" id="nav-product">
            Forgot what timeline? Search it using Gundam Name
          </a>
          <div class="input-group">
            <div class="form-outline">
              <input
                type="search"
                id="form1"
                class="form-control"
                placeholder="e.g. unicorn"
              />
              <button
                type="button"
                class="btn btn-success mx-2 my-4"
                style="width: 100px"
              >
                Search
              </button>
              <button
                type="button"
                class="btn btn-secondary mx-2 my-4"
                style="width: 100px"
              >
                Clear
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>

  <!-- END OF SIDEBAR SECTION -->

</template>